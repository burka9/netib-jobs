import { Chat, Message } from "node-telegram-bot-api";
import { defaultAction, textMessageActionMap } from "../../action/message/text.message";

export default async function(text: string, chat: Chat, message?: Message, update_id?: number) {
	try {
		await textMessageActionMap[text](chat, message, update_id)
	} catch {
		await defaultAction(text, chat, message, update_id)
	}
}