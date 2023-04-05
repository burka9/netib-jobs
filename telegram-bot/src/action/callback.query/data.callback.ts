import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import logger from "../../common/logger";
import { MainMenuFromViewJobs, ViewJobsMainMenu } from "../../response/markup/inline.button";
import { editTextMessage } from "../../response/message/text.message";
import { viewJobsInlineKeyboard } from "../../response/markup/inline.keyboard";
import { editWelcomeMessage } from "../../response/common/welcome.message";
import { emptyAnswerCallbackQuery } from "../../response/callback.query/data.callback";

interface CallbackAction {
	[key: string]: (
		user: _user,
		from: User,
		callback_query: CallbackQuery,
		message: Message,
		update_id?: number
	) => Promise<void>;
}

const callbackAction: CallbackAction = {
	[ViewJobsMainMenu.callback_data as string]: async (
		user: _user,
		from: User,
		callback_query: CallbackQuery,
		message: Message,
		update_id?: number
	) => {
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: `You can view jobs using our telegram channel or our website.`,
			reply_markup: viewJobsInlineKeyboard
		})
	},
	[MainMenuFromViewJobs.callback_data as string]: async (
		user: _user,
		from: User,
		callback_query: CallbackQuery,
		message: Message,
		update_id?: number
	) => {
		await editWelcomeMessage(message.chat, message.message_id)
	}
}

const defaultCallbackAction = async (
	user: _user,
	data: string,
	from: User,
	callback_query: CallbackQuery,
	message?: Message,
	update_id?: number
) => {
	logger.debug(`unknow callback data: ${data}`)
	// handle text messages based on telegram flow

	// send empty answer to callback query
	await emptyAnswerCallbackQuery(callback_query.id)
}

export const defaultAction = defaultCallbackAction
export const callbackActionMap = callbackAction