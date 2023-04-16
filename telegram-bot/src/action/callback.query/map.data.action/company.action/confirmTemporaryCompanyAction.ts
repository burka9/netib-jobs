import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { apiPostRequest } from "../../../../api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { myJobsMessage } from "../../../../response/common/myJobs.message";
import { editTextMessage, sendTextMessageAndRemoveKeyboard } from "../../../../response/message/text.message";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	await editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		text: `company details confirmed`
	})
	
	await changeTelegramStep(from.id, TelegramStep.ConfirmTemporaryCompany)

	let { success } = await apiPostRequest('add-temporary-company', from.id)

	await sendTextMessageAndRemoveKeyboard({
		chat_id: from.id,
		text: success ? `Company added` : `Failed to add company`
	})

	await myJobsMessage(from.id)
}