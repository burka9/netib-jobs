import { CallbackQuery } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import dataCallback from "./data.callback";

export default async function(user: _user, callback_query: CallbackQuery, update_id?: number) {
	const { id, from, message, chat_instance, data } = callback_query

	if (data) return dataCallback(user, data, from, callback_query, message, update_id)
}
