import { Chat, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { isCancel } from "axios";
import cancelButtonMessage from "../../../../response/common/cancel.button.message";
import { apiGetRequest, apiPostRequest } from "../../../../api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { cancelButtonMarkup, jobTypeMarkup, sectorKeyboardMarkup, skipAndCancelButtonMarkup } from "../../../../response/markup";
import { sendTextMessage, sendTextMessageAndRemoveKeyboard } from "../../../../response/message/text.message";
import { isSkip } from "../../../../response/common/skip.button.message";
import { tempJobLocation, tempJobSalary } from "../../../../response/common";
import { viewTempJobPost } from "../../../../response/common/job.message";

export const addTempJobTitle = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	await apiPostRequest('temporary-job-post', chat.id, { title: text })
	await changeTelegramStep(chat.id, TelegramStep.TempJobDescription)

	await sendTextMessage({
		chat_id: chat.id,
		text: `Job Description`,
		reply_markup: cancelButtonMarkup
	})
}

export const addTempJobDescription = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	await apiPostRequest('temporary-job-post', chat.id, { description: text })
	await changeTelegramStep(chat.id, TelegramStep.TempJobType)

	await sendTextMessage({
		chat_id: chat.id,
		text: `Job Type`,
		reply_markup: jobTypeMarkup()
	})
}

export const addTempJobType = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	await apiPostRequest('temporary-job-post', chat.id, { type: text })
	await changeTelegramStep(chat.id, TelegramStep.TempJobSector)

	await sendTextMessage({
		chat_id: chat.id,
		text: `Job Sector`,
		reply_markup: await sectorKeyboardMarkup(chat.id)
	})
}

export const addTempJobSector = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	const { success, message: responseMessage } = await apiPostRequest('temporary-job-post', chat.id, { sector: text })

	if (!success && responseMessage === 'no sector found') {
		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose a valid sector`,
			reply_markup: await sectorKeyboardMarkup(chat.id)
		})
	} else if (success) {
		await changeTelegramStep(chat.id, TelegramStep.TempJobEmployeeCount)

		await sendTextMessage({
			chat_id: chat.id,
			text: `How many applicants do you need?`,
			reply_markup: skipAndCancelButtonMarkup
		})
	}
}

export const addTempJobEmployeeCount = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	if (isSkip(text)) {
		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: `Applicants detail skipped`
		})

		await changeTelegramStep(chat.id, TelegramStep.TempJobSalary)
		return tempJobSalary(chat.id)
	} else {
		if (isNaN(Number(text))) {
			return sendTextMessageAndRemoveKeyboard({
				chat_id: chat.id,
				text: 'Please send a number'
			})
		} else {
			let { success, message: responseMessage } = await apiPostRequest('temporary-job-post', chat.id, { employeeCount: Number(text) })

			if (success) {
				await changeTelegramStep(chat.id, TelegramStep.TempJobSalary)
				return tempJobSalary(chat.id)
			} else {
				// return 
			}
		}
	}
}

export const addTempJobSalary = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	if (isSkip(text)) {
		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: `Salary/compensation skipped`
		})

		await changeTelegramStep(chat.id, TelegramStep.TempJobLocation)
		return tempJobLocation(chat.id)
	} else {
		if (isNaN(Number(text))) {
			return sendTextMessageAndRemoveKeyboard({
				chat_id: chat.id,
				text: 'Please send a number'
			})
		} else {
			let { success, message: responseMessage } = await apiPostRequest('temporary-job-post', chat.id, { salary: Number(text) })

			if (success) {
				await changeTelegramStep(chat.id, TelegramStep.TempJobLocation)
				return tempJobLocation(chat.id)
			} else {
			}
		}
	}
}

export const addTempJobLocation = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	// if (isSkip(text)) {
	// 	await sendTextMessageAndRemoveKeyboard({
	// 		chat_id: chat.id,
	// 		text: `Job location skipped`
	// 	})

	// 	// await changeTelegramStep(chat.id, TelegramStep.ViewTempJobPost)
	// 	return viewTempJobPost(user, chat.id)
	// } else {
	let { success, message: responseMessage } = await apiPostRequest('temporary-job-post', chat.id, { location: text })

	if (success) {
		await changeTelegramStep(chat.id, TelegramStep.ViewTempJobPost)
		user = (await apiGetRequest(`user-info`, chat.id)).user

		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: 'Please wait...'
		})
		return viewTempJobPost(user, chat.id)
	} else {
		return tempJobLocation(chat.id)
	}
}