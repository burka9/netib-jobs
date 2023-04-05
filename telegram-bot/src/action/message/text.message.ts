import { Chat, Message } from "node-telegram-bot-api";
import logger from "../../common/logger";
import { _user } from "../../interface/api";
import { welcomeMessage } from "../../response/common/welcome.message";
import { deleteMessage, sendTextMessage } from "../../response/message/text.message";
import { sharePhoneNumberMarkup } from "../../response/markup";

interface TextMessageAction {
	[key: string]: (user: _user, chat: Chat, message?: Message, update_id?: number) => Promise<void>;
}

const textMessageAction: TextMessageAction = {
	'/start': async (user: _user, chat: Chat, message?: Message, update_id?: number) => {
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
}

const defaultTextMessageAction = async (
	user: _user,
	text: string,
	chat: Chat,
	message: Message,
	update_id?: number
) => {
	logger.debug(`unknow text message: ${text}`)
	// handle text messages based on telegram flow

	// delete message
	await deleteMessage({
		chat_id: chat.id,
		message_id: message?.message_id
	})
}

export const defaultAction = defaultTextMessageAction
export const textMessageActionMap = textMessageAction
