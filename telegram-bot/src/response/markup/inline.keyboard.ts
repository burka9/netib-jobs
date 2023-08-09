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

export const mainMenuInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[
			ViewJobsMainMenu,
			MyJobsMainMenu
		]
	]
}

export const viewJobsInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[ViewJobsFromTelegram],
		[ViewJobsFromWebsite],
		[MainMenu]
	]
}

export const termsAndConditionInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[AcceptTerms, DeclineTerms]
	]
}

export const myJobsInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[PostJob, MyCompany],
		// [AcceptedJobs, PendingJobs],
		// [DeclinedJobs, MainMenu]
		[MainMenu]
	]
}

export const sharePersoanlEmailInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[MainMenu]
	]
}

export const MyCompanyInlineKeyboard = (user: _user): InlineKeyboardMarkup | undefined => {
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
	
	return { inline_keyboard }
}

export const ViewTemporaryCompanyInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		// [ConfirmTemporaryCompany, EditTemporaryCompany],
		[ConfirmTemporaryCompany],
		[CancelTemporaryCompany]
	]
}

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

export const HowToPostJobInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		// private client - company
		// back - main menu
		[PostJobAsPrivate, PostJobAsCompany],
		[BackToMyJobs, MainMenu]
	]
}

export const ViewTemporaryJobPostInlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[ConfrimTempJobPost, CancelTempJobPost],
	]
}

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

export const HowToApplyInlineKeyboard = {
	inline_keyboard: [
		[]
	]
}