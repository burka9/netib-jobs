import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import { ViewJobsMainMenu, PostJobsMainMenu, MainMenuFromViewJobs } from "./inline.button";
import { ViewJobsFromTelegram } from "./inline.button";
import { ViewJobsFromWebsite } from "./inline.button";

export const mainMenuInlineKeyboard = {
	inline_keyboard: [
		[
			ViewJobsMainMenu,
			PostJobsMainMenu,
		]
	]
} as InlineKeyboardMarkup

export const viewJobsInlineKeyboard = {
	inline_keyboard: [
		[ViewJobsFromTelegram],
		[ViewJobsFromWebsite],
		[MainMenuFromViewJobs]
	]
} as InlineKeyboardMarkup
