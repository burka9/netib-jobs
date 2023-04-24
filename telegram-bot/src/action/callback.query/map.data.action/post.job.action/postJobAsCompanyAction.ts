import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { editTextMessage, sendTextMessage } from "../../../../response/message/text.message";
import { cancelButtonMarkup } from "../../../../response/markup";
import { apiPostRequest } from "../../../../api";
import postJobAction from "../postJobAction";
import { PostAsCompanyInlineKeyboard } from "../../../../response/markup/inline.keyboard";
import postJobAsPrivateAction from "./postJobAsPrivateAction";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {

	if (user.companies.length === 0) {
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: `You should first add company.`
		})
		return postJobAction(user, from, callback_query, message, -200)
	} else {
		return editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: `Select one of your companies.

Selected company profile will be displayed as a contact information
`,
			reply_markup: PostAsCompanyInlineKeyboard(user)
		})
	}
}

export const selectCompany = async (user: _user, id: number, from: User, callback_query: CallbackQuery, message: Message, update_id?: number) => {
	await apiPostRequest('temporary-job-post', from.id, { companyId: id })
	
	await postJobAsPrivateAction(user, from, callback_query, message, update_id)
}