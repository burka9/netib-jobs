import { Update } from "node-telegram-bot-api";
import Message from './message'

export default async function(update: Update) {
	const { message, update_id } = update

	if (message) return Message(message, update_id)
}