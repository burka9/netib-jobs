import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { _user } from "../../../../interface/api";
import { editTextMessage } from "../../../../response/message/text.message";
import { MyCompanyInlineKeyboard } from "../../../../response/markup/inline.keyboard";
import { myCompanyMessage } from "../../../../response/common/company.message";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	await myCompanyMessage(user, from.id, message.message_id)
}
