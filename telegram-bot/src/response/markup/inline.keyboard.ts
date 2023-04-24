import { InlineKeyboardMarkup, KeyboardButton } from "node-telegram-bot-api";
import {
	ViewJobsMainMenu,
	AcceptTerms,
	DeclineTerms,
	PostJob,
	MyCompany,
	AcceptedJobs,
	DeclinedJobs,
	PendingJobs,
	MainMenu,
	AddCompany,
	ConfirmTemporaryCompany,
	EditTemporaryCompany,
	CancelTemporaryCompany,
	BackToMyJobs,
	MyJobsMainMenu,
	EditCompany,
	DeleteCompany,
	BackToMyCompany,
	CompanyButton,
	EditCompanyAttribute,
	BackToEditCompany,
	PostJobAsPrivate,
	PostJobAsCompany,
	ConfrimTempJobPost,
	CancelTempJobPost,
	BackToPostJob,
	PostAsCompanyButton
} from "./inline.button";
import { ViewJobsFromTelegram } from "./inline.button";
import { ViewJobsFromWebsite } from "./inline.button";
import { _user } from "../../interface/api";

export const mainMenuInlineKeyboard = {
	inline_keyboard: [
		[
			ViewJobsMainMenu,
			MyJobsMainMenu
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
		[PostJob, MyCompany],
		[AcceptedJobs, PendingJobs],
		[DeclinedJobs, MainMenu]
	]
} as InlineKeyboardMarkup

export const sharePersoanlEmailInlineKeyboard = {
	inline_keyboard: [
		[MainMenu]
	]
} as InlineKeyboardMarkup

export const MyCompanyInlineKeyboard = (user: _user) => {
	if (!user) return
	
	const companies = user.companies.map(u => [CompanyButton(u.id, u.name)])
	
	const inline_keyboard: KeyboardButton[][] = [
		...companies
	]

	if (companies.length < 3) inline_keyboard.push(
		[AddCompany]
	)

	inline_keyboard.push(
		[BackToMyJobs, MainMenu]
	)
	
	return { inline_keyboard } as InlineKeyboardMarkup
}

export const ViewTemporaryCompanyInlineKeyboard = {
	inline_keyboard: [
		// [ConfirmTemporaryCompany, EditTemporaryCompany],
		[ConfirmTemporaryCompany],
		[CancelTemporaryCompany]
	]
} as InlineKeyboardMarkup

export const ViewCompanyInlineKeyboard = (id: number): InlineKeyboardMarkup => ({
	inline_keyboard: [
		// edit, delete, back, main menu
		[EditCompany(id), DeleteCompany(id)],
		[BackToMyCompany, MainMenu]
	]
})

export const EditCompanyInlineKeyboard = (id: number): InlineKeyboardMarkup => ({
	inline_keyboard: [
		[EditCompanyAttribute(id, 'name'), EditCompanyAttribute(id, 'description')],
		[EditCompanyAttribute(id, 'sector'), EditCompanyAttribute(id, 'employeeCount')],
		[EditCompanyAttribute(id, 'location'), EditCompanyAttribute(id, 'phone')],
		[EditCompanyAttribute(id, 'email'), EditCompanyAttribute(id, 'website')],
		[CompanyButton(id, 'Back'), MainMenu]
	]
})

export const CancelEditCompanyAttributeInlineKeyboard = (id: number): InlineKeyboardMarkup => ({
	inline_keyboard: [
		[BackToEditCompany(id, 'Cancel')]
	]
})

export const HowToPostJobInlineKeyboard = {
	inline_keyboard: [
		// private client - company
		// back - main menu
		[PostJobAsPrivate, PostJobAsCompany],
		[BackToMyJobs, MainMenu]
	]
} as InlineKeyboardMarkup

export const ViewTemporaryJobPostInlineKeyboard = {
	inline_keyboard: [
		[ConfrimTempJobPost, CancelTempJobPost],
	]
} as InlineKeyboardMarkup

export const PostAsCompanyInlineKeyboard = (user: _user): InlineKeyboardMarkup => {
	const markup: InlineKeyboardMarkup = {
		inline_keyboard: []
	}

	user.companies.forEach(company => markup.inline_keyboard.push([PostAsCompanyButton(company)]))

	markup.inline_keyboard.push(
		[BackToPostJob, MainMenu]
	)

	return markup
}