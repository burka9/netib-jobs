import { Update } from "node-telegram-bot-api";
import Message from "./message";
import { _user } from "../interface/api";
import CallbackQuery from "./callback.query";

export default async function(user: _user, update: Update) {
	const { message, callback_query, update_id } = update

	// console.log(update)

	if (message) return Message(user, message, update_id)
	else if (callback_query) return CallbackQuery(user, callback_query, update_id)
}