import { Chat, KeyboardButton, Message, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { TelegramStep, _sector, _user } from "../../../../interface/api";
import cancelButtonMessage, { isCancel } from "../../../../response/common/cancel.button.message";
import { apiGetRequest, apiPostRequest } from "../../../../api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { sendTextMessage, sendTextMessageAndRemoveKeyboard } from "../../../../response/message/text.message";
import { cancelButtonMarkup, cityKeyboardMarkup, companySizeKeyboardMarkup, countryKeyboardMarkup, sectorKeyboardMarkup, skipAndCancelButtonMarkup } from "../../../../response/markup";
import { isSkip } from "../../../../response/common/skip.button.message";
import EmailValidator from "email-validator";
import { companyEmail, companyPhone, companyWebsite, registeredEmail, sendValidEmail, sendValidPhone, sendValidWebsite } from "../../../../response/common";
import { validatePhoneFormat } from "../../../../common/phoneFormat";
import validUrl from "valid-url";
import { viewTemporaryCompany } from "../../../../response/common/company.message";

export const addCompanyTitle = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	await apiPostRequest('temporary-company', chat.id, { name: text })
	await changeTelegramStep(chat.id, TelegramStep.CompanyDescription)

	await sendTextMessage({
		chat_id: chat.id,
		text: `Company Description`,
		reply_markup: cancelButtonMarkup
	})
}

export const addCompanyDescription = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	await apiPostRequest('temporary-company', chat.id, { description: text })
	await changeTelegramStep(chat.id, TelegramStep.Sector)

	await sendTextMessage({
		chat_id: chat.id,
		text: `Choose Sector`,
		reply_markup: await sectorKeyboardMarkup(chat.id)
	})
}

export const addSector = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	let { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { sector: text })

	if (!success && responseMessage === 'no sector found') {
		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose a valid sector`,
			reply_markup: await sectorKeyboardMarkup(chat.id)
		})
	} else {
		await changeTelegramStep(chat.id, TelegramStep.Country)

		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose Country`,
			reply_markup: await countryKeyboardMarkup(chat.id)
		})
	}
}

export const addCountry = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	let { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { country: text })

	if (!success && responseMessage === 'no country found') {
		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose a valid country`,
			reply_markup: await countryKeyboardMarkup(chat.id)
		})
	} else {
		await changeTelegramStep(chat.id, TelegramStep.City)

		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose City`,
			reply_markup: await cityKeyboardMarkup(chat.id)
		})
	}
}

export const addCity = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	let { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { city: text })

	if (!success && responseMessage === 'no city found') {
		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose a valid city`,
			reply_markup: await cityKeyboardMarkup(chat.id)
		})
	} else {
		await changeTelegramStep(chat.id, TelegramStep.EmployeeCount)

		return sendTextMessage({
			chat_id: chat.id,
			text: `Company size`,
			reply_markup: companySizeKeyboardMarkup()
		})
	}
}

export const addCompanySize = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	let { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { employeeCount: text })

	if (!success && responseMessage === 'no valid size found') {
		return sendTextMessage({
			chat_id: chat.id,
			text: `Choose a valid company size`,
			reply_markup: await companySizeKeyboardMarkup()
		})
	} else {
		await changeTelegramStep(chat.id, TelegramStep.CompanyEmail)

		return companyEmail(chat.id)
	}
}


export const addCompanyEmail = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	if (isSkip(text)) { // skipped company email
		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: `Email skipped`
		})

		await changeTelegramStep(chat.id, TelegramStep.CompanyPhone)
		return companyPhone(chat.id)
	} else { // entering company email
		if (!EmailValidator.validate(text)) { // not a valid email
			await sendValidEmail(chat.id)
			return companyEmail(chat.id)
		} else { // valid email
			const { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { email: text })

			if (!success) {
				if (responseMessage === 'email is registered') {
					await registeredEmail(chat.id)
				}
				else if (responseMessage === 'invalid email') {
					await sendValidEmail(chat.id)
				}
				return companyEmail(chat.id)
			} else {
				// email is added
				await changeTelegramStep(chat.id, TelegramStep.CompanyPhone)
				await companyPhone(chat.id)

				return
			}
		}
	}
}

export const addCompanyPhone = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	if (isSkip(text)) { // skip company phone
		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: `Phone skipped`
		})

		await changeTelegramStep(chat.id, TelegramStep.CompanyWebsite)
		return companyWebsite(chat.id)
	} else { // entering company phone
		if (!validatePhoneFormat(text)) {
			await sendValidPhone(chat.id)
			return companyPhone(chat.id)
		} else { // valid phone number
			const { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { phone: text })

			if (!success) {
				if (responseMessage === 'invalid phone') {
					await sendValidPhone(chat.id)
					return companyPhone(chat.id)
				}
			} else if (success) {
				await changeTelegramStep(chat.id, TelegramStep.CompanyWebsite)

				return companyWebsite(chat.id)
			}
		}
	}
}

export const addCompanyWebsite = async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (isCancel(text)) return cancelButtonMessage(chat)

	if (isSkip(text)) { // skip company website
		await sendTextMessageAndRemoveKeyboard({
			chat_id: chat.id,
			text: `Website skipped`
		})

		await changeTelegramStep(chat.id, TelegramStep.ViewTemporaryCompany)
		return viewTemporaryCompany(user, chat.id)
	} else { // entering company website
		
		if (!validUrl.isWebUri(text)) {
			await sendValidWebsite(chat.id)
			return companyWebsite(chat.id)
		} else { // valid website number
			const { success, message: responseMessage } = await apiPostRequest('temporary-company', chat.id, { website: text })

			if (!success) {
				if (responseMessage === 'invalid website') {
					await sendValidWebsite(chat.id)
					return companyWebsite(chat.id)
				}
			} else if (success) {
				await changeTelegramStep(chat.id, TelegramStep.ViewTemporaryCompany)

				return viewTemporaryCompany(user, chat.id)
			}
		}
	}
}
