import { InlineKeyboardButton } from "node-telegram-bot-api"
import { TELEGRAM, WEBSITE } from "../../common/env"

export const MainMenu: InlineKeyboardButton = {
	text: 'Main Menu',
	callback_data: 'go-to-main-menu'
}

export const ViewJobsMainMenu: InlineKeyboardButton = {
	text: 'View Jobs',
	callback_data: 'view-jobs-main-menu'
}

export const MyJobsMainMenu: InlineKeyboardButton = {
	text: 'My Jobs',
	callback_data: 'my-jobs-main-menu'
}

export const ViewJobsFromTelegram: InlineKeyboardButton = {
	text: 'Telegram Channel',
	url: TELEGRAM.CHANNEL
}

export const ViewJobsFromWebsite: InlineKeyboardButton = {
	text: 'Website (coming soon)',
	url: WEBSITE.URL
}

export const AcceptTerms: InlineKeyboardButton = {
	text: 'Agree',
	callback_data: 'agree-terms-and-condition'
}

export const DeclineTerms: InlineKeyboardButton = {
	text: 'Decline',
	callback_data: 'decline-terms-and-condition'
}

export const PostJob: InlineKeyboardButton = {
	text: 'Post Jobs',
	callback_data: 'post-job'
}

export const MyCompanies: InlineKeyboardButton = {
	text: 'My Company',
	callback_data: 'my-company'
}

export const PendingJobs: InlineKeyboardButton = {
	text: 'Pending Jobs',
	callback_data: 'pending-jobs'
}

export const AcceptedJobs: InlineKeyboardButton = {
	text: 'Accepted Jobs',
	callback_data: 'accepted-jobs'
}

export const DeclinedJobs: InlineKeyboardButton = {
	text: 'DeclinedJobs',
	callback_data: 'declined-jobs'
}
