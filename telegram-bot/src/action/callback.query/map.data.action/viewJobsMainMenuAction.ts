import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import message from "../../../controller/message";
import { _user } from "../../../interface/api";
import { viewJobsInlineKeyboard } from "../../../response/markup/inline.keyboard";
import { editTextMessage } from "../../../response/message/text.message";

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
		text: `You can view jobs using our telegram channel or our website.`,
		reply_markup: viewJobsInlineKeyboard
	})
}
