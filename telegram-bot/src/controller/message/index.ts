import { Message } from "node-telegram-bot-api";
import textMessage from "./text.message";

export default async function(message: Message, update_id?: number) {
	const { message_id, chat, date, from, text } = message

	if (text) return textMessage(text, chat, message, update_id)
}