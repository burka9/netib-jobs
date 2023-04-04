import { Chat, Message } from "node-telegram-bot-api";
import logger from "../../common/logger";
import { sendTextMessage } from "../../response/message/text.message";

interface TextMessageAction {
	[key: string]: (chat: Chat, message?: Message, update_id?: number) => Promise<void>;
}

const textMessageAction: TextMessageAction = {
	'/start': async (chat: Chat, message?: Message, update_id?: number) => {
	}
}

const defaultTextMessageAction = async (
	text: string,
	chat: Chat,
	message?: Message,
	update_id?: number
): Promise<void> => {
	logger.debug(`unknow text message: ${text}`)
	await sendTextMessage({
		chat_id: chat.id,
		text: 'unknown text'
	})
}

export const defaultAction = defaultTextMessageAction
export const textMessageActionMap = textMessageAction
