import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { _user } from "../../../../interface/api";
import { editTextMessage } from "../../../../response/message/text.message";
import { welcomeMessage } from "../../../../response/common/welcome.message";

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
		text: 'Adding company canceled'
	})

	await welcomeMessage(from)
}