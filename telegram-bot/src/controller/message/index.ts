import { Message } from "node-telegram-bot-api";
import textMessage from "./text.message";
import Contact from "./contact";
import { _user } from "../../interface/api";

export default async function(user: _user, message: Message, update_id?: number) {
	const { message_id, chat, date, from, text, contact } = message

	if (text) return textMessage(user, text, chat, message, update_id)
	else if (contact) return Contact(user, contact, chat, message, update_id)
}
