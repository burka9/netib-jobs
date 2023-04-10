import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import logger from "../../common/logger";
import { AcceptTerms, DeclineTerms, MainMenu, MyJobsMainMenu, ViewJobsMainMenu } from "../../response/markup/inline.button";
import viewJobsMainMenuAction from "./map.data.action/viewJobsMainMenuAction";
import myJobsMainMenuAction from "./map.data.action/myJobsMainMenuAction";
import acceptTermsAction from "./map.data.action/acceptTermsAction";
import declineTermsAction from "./map.data.action/declineTermsAction";
import mainMenuAction from "./map.data.action/MainMenuFromMyJobsAction";


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
	[MainMenu.callback_data as string]: mainMenuAction,
	[ViewJobsMainMenu.callback_data as string]: viewJobsMainMenuAction,
	[MyJobsMainMenu.callback_data as string]: myJobsMainMenuAction,
	[AcceptTerms.callback_data as string]: acceptTermsAction,
	[DeclineTerms.callback_data as string]: declineTermsAction,
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
}

export const defaultAction = defaultCallbackAction
export const callbackActionMap = callbackAction