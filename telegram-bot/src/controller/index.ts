import { Update } from "node-telegram-bot-api";
import Message from "./message";
import { _user } from "../interface/api";
import CallbackQuery from "./callback.query";
import MyChatMember from "./my.chat.member";

export default async function(user: _user, update: Update) {
	const { message, callback_query, my_chat_member, update_id } = update

	// console.log(update)

	if (message) return Message(user, message, update_id)
	else if (callback_query) return CallbackQuery(user, callback_query, update_id)
	else if (my_chat_member) return MyChatMember(user, my_chat_member, update_id)
}