import { Chat, Message } from "node-telegram-bot-api"
import { _user } from "../../../interface/api"
import { welcomeMessage } from "../../../response/common/welcome.message"
import { sharePhoneNumberMarkup } from "../../../response/markup"
import { sendTextMessage } from "../../../response/message/text.message"

export default async (user: _user, chat: Chat, message: Message, update_id?: number) => {
	if (user.phone === null) {
		// prompt phone
		await sendTextMessage({
			chat_id: chat.id,
			text: `Share your phone number using the button below 👇👇`,
			reply_markup: sharePhoneNumberMarkup
		})
	} else {
		// show welcome message
		await welcomeMessage(chat)
	}
}
