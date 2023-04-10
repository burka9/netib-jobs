import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { _user } from "../../../interface/api";
import { editWelcomeMessage, welcomeMessage } from "../../../response/common/welcome.message";
import { editTextMessage } from "../../../response/message/text.message";
import sleep from "../../../common/sleep";

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
		text: `You must agree to our terms and conditions to access the 'My Jobs' section.`
	})
	await sleep()
	await welcomeMessage(from)
}
