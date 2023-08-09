import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { callbackActionMap, defaultAction } from "../../action/callback.query/data.callback";
import logger from "../../common/logger";
import { _user } from "../../interface/api";
import { emptyAnswerCallbackQuery } from "../../response/callback.query/data.callback";

export default async function(user: _user, data: string, from: User, callback_query: CallbackQuery, message?: Message, update_id?: number) {
	// skip if it is an older callback data
	if (message && message.message_id < user.telegram.lastCallbackMessageID) {
		logger.debug(`old callback data (${callback_query.id}) ${data}`)
		return emptyAnswerCallbackQuery(callback_query.id)
	}
	
	try {
		await callbackActionMap[data](user, from, callback_query, message as Message, update_id)
	} catch(err: any) {
		logger.debug(`error parsing callback action ${data}`)
		try {
			logger.debug(JSON.stringify(err?.response?.data))
		} catch {}
		logger.error(err.message)
		await defaultAction(user, data, from, callback_query, message as Message, update_id)
	}

	// send empty answer to callback query
	await emptyAnswerCallbackQuery(callback_query.id)
}
