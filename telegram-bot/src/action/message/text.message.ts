import { Chat, Message } from "node-telegram-bot-api";
import logger from "../../common/logger";
import { TelegramStep, _user } from "../../interface/api";
import { welcomeMessage } from "../../response/common/welcome.message";
import { deleteMessage, sendTextMessage } from "../../response/message/text.message";
import { sharePhoneNumberMarkup } from "../../response/markup";
import start from "./map.text/start";
import addPersonalEmail from "./map.text/addPersonalEmail";

interface TextMessageAction {
	[key: string]: (user: _user, chat: Chat, message: Message, update_id?: number) => Promise<void>;
}

const textMessageAction: TextMessageAction = {
	'/start': start,
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
	switch (user.telegram.step) {
		case TelegramStep.WaitingPersonalEmail:
			await addPersonalEmail(user, text, chat, message, update_id)
			break
		default:
			// delete message
			await deleteMessage({
				chat_id: chat.id,
				message_id: message?.message_id
			})
	}
}

export const defaultAction = defaultTextMessageAction
export const textMessageActionMap = textMessageAction
