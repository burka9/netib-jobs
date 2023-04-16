import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import logger from "../../common/logger";
import { AcceptTerms, AddCompany, BackToMyJobs, CancelTemporaryCompany, ConfirmTemporaryCompany, DeclineTerms, MainMenu, MyCompany, MyJobsMainMenu, ViewJobsMainMenu } from "../../response/markup/inline.button";
import viewJobsMainMenuAction from "./map.data.action/viewJobsMainMenuAction";
import myJobsMainMenuAction from "./map.data.action/myJobsMainMenuAction";
import acceptTermsAction from "./map.data.action/acceptTermsAction";
import declineTermsAction from "./map.data.action/declineTermsAction";
import mainMenuAction from "./map.data.action/MainMenuFromMyJobsAction";
import myCompanyAction from "./map.data.action/company.action/myCompanyAction";
import addCompanyAction from "./map.data.action/company.action/addCompanyAction";
import cancelTemporaryCompanyAction from "./map.data.action/company.action/cancelTemporaryCompanyAction";
import confirmTemporaryCompanyAction from "./map.data.action/company.action/confirmTemporaryCompanyAction";
import viewCompanyAction from "./map.data.action/company.action/viewCompanyAction";
import editCompanyAction from "./map.data.action/company.action/editCompanyAction";
import deleteCompanyAction from "./map.data.action/company.action/deleteCompanyAction";


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
	[BackToMyJobs.callback_data as string]: myJobsMainMenuAction,
	[AcceptTerms.callback_data as string]: acceptTermsAction,
	[DeclineTerms.callback_data as string]: declineTermsAction,
	[MyCompany.callback_data as string]: myCompanyAction,
	[AddCompany.callback_data as string]: addCompanyAction,
	[CancelTemporaryCompany.callback_data as string]: cancelTemporaryCompanyAction,
	[ConfirmTemporaryCompany.callback_data as string]: confirmTemporaryCompanyAction,
}

const defaultCallbackAction = async (
	user: _user,
	data: string,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	logger.debug(`unknown callback data: ${data}`)
	// handle callback data based on telegram flow

	// company-view, company-edit, company-delete
	// under company-edit we can have a third text
	// company-edit-2 => company-edit-2-name
	
	const [text1, text2, id, text3] = data.split("-")

	if (text1 === "company" && !isNaN(Number(id))) {
		if (text2 === "view") return viewCompanyAction(user, Number(id), from, callback_query, message, update_id)
		else if (text2 === "edit") return editCompanyAction(user, [Number(id), text3], from, callback_query, message, update_id)
		else if (text2 === "delete") return deleteCompanyAction(user, Number(id), from, callback_query, message, update_id)
		else {}
	}
}

export const defaultAction = defaultCallbackAction
export const callbackActionMap = callbackAction