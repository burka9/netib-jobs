import { Chat, Message } from "node-telegram-bot-api";
import { defaultAction, textMessageActionMap } from "../../action/message/text.message";
import { _user } from "../../interface/api";
import logger from "../../common/logger";

export default async function(user: _user, text: string, chat: Chat, message: Message, update_id?: number) {
	logger.debug(`text message sent (${message.message_id}): ${text}`)
	
	try {
		await textMessageActionMap[text](user, chat, message, update_id)
	} catch {
		await defaultAction(user, text, chat, message, update_id)
	}
}
