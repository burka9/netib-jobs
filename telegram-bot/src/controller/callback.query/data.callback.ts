import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { defaultAction, callbackActionMap } from "../../action/callback.query/data.callback";
import { _user } from "../../interface/api";
import logger from "../../common/logger";

export default async function(user: _user, data: string, from: User, callback_query: CallbackQuery, message?: Message, update_id?: number) {
	try {
		await callbackActionMap[data](user, from, callback_query, message as Message, update_id)
	} catch(err: any) {
		logger.debug(`error parsing callback action ${data}`)
		logger.error(err.message)
		await defaultAction(user, data, from, callback_query, message, update_id)
	}
}
