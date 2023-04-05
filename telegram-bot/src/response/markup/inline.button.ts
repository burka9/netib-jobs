import { InlineKeyboardButton } from "node-telegram-bot-api"
import { TELEGRAM, WEBSITE } from "../../common/env"

export const MainMenuFromViewJobs: InlineKeyboardButton = {
	text: 'Main Menu',
	callback_data: 'main-menu-from-view-jobs'
}

export const ViewJobsMainMenu: InlineKeyboardButton = {
	text: 'View Jobs',
	callback_data: 'view-jobs-main-menu'
}

export const PostJobsMainMenu: InlineKeyboardButton = {
	text: 'Post Job',
	callback_data: 'post-job-main-menu'
}

export const ViewJobsFromTelegram: InlineKeyboardButton = {
	text: 'Telegram Channel',
	url: TELEGRAM.CHANNEL
}

export const ViewJobsFromWebsite: InlineKeyboardButton = {
	text: 'Website (coming soon)',
	url: WEBSITE.URL
}

export const AgreeTerms: InlineKeyboardButton = {
	text: 'Agree',
	callback_data: 'agree-terms-and-condition'
}

export const CancelTerms: InlineKeyboardButton = {
	text: 'Cancel',
	callback_data: 'cancel-terms-and-condition'
}

export const CancelJobPost: InlineKeyboardButton = {
	text: 'Cancel',
	callback_data: 'cancel_job_post'
}
