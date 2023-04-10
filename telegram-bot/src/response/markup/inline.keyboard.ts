import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import {
	ViewJobsMainMenu,
	MyJobsMainMenu,
	AcceptTerms,
	DeclineTerms,
	PostJob,
	MyCompanies,
	AcceptedJobs,
	DeclinedJobs,
	PendingJobs,
	MainMenu
} from "./inline.button";
import { ViewJobsFromTelegram } from "./inline.button";
import { ViewJobsFromWebsite } from "./inline.button";

export const mainMenuInlineKeyboard = {
	inline_keyboard: [
		[
			ViewJobsMainMenu,
			MyJobsMainMenu,
		]
	]
} as InlineKeyboardMarkup

export const viewJobsInlineKeyboard = {
	inline_keyboard: [
		[ViewJobsFromTelegram],
		[ViewJobsFromWebsite],
		[MainMenu]
	]
} as InlineKeyboardMarkup

export const termsAndConditionInlineKeyboard = {
	inline_keyboard: [
		[AcceptTerms, DeclineTerms]
	]
} as InlineKeyboardMarkup

export const myJobsInlineKeyboard = {
	inline_keyboard: [
		[PostJob, MyCompanies],
		[AcceptedJobs, PendingJobs],
		[DeclinedJobs, MainMenu]
	]
} as InlineKeyboardMarkup

export const sharePersoanlEmailInlineKeyboard = {
	inline_keyboard: [
		[MainMenu]
	]
} as InlineKeyboardMarkup