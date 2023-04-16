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

export const BackToMyJobs: InlineKeyboardButton = {
	text: 'Back',
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

export const MyCompany: InlineKeyboardButton = {
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
	text: 'Declined Jobs',
	callback_data: 'declined-jobs'
}

export const AddCompany: InlineKeyboardButton = {
	text: 'Add Company',
	callback_data: 'add-company'
}

export const ConfirmTemporaryCompany: InlineKeyboardButton = {
	text: 'Confirm',
	callback_data: 'confirm-temporary-company'
}

export const EditTemporaryCompany: InlineKeyboardButton = {
	text: 'Edit',
	callback_data: 'edit-temporary-company'
}

export const CancelTemporaryCompany: InlineKeyboardButton = {
	text: 'Cancel',
	callback_data: 'cancel-temporary-company'
}

export const CompanyButton = (id: number, name: string): InlineKeyboardButton => ({
	text: name,
	callback_data: `company-view-${id}`
})

export const EditCompany = (id: number): InlineKeyboardButton => ({
	text: 'Edit',
	callback_data: `company-edit-${id}`
})
export type EditTypeAttribute = 'name' | 'description' | 'employeeCount' | 'sector' | 'location' | 'email' | 'phone' | 'website'
export const EditCompanyAttribute = (id: number, key: EditTypeAttribute): InlineKeyboardButton => ({
	text: key === 'employeeCount' ? 'Employee Count' : key[0].toUpperCase().concat(key.substring(1)),
	callback_data: `company-edit-${id}-${key}`
})
export const BackToEditCompany = (id: number, text = 'Back'): InlineKeyboardButton => ({
	text,
	callback_data: `company-edit-${id}`
})

export const DeleteCompany = (id: number): InlineKeyboardButton => ({
	text: 'Delete',
	callback_data: `company-delete-${id}`
})

export const BackToMyCompany = {
	text: 'Back',
	callback_data: 'my-company'
} as InlineKeyboardButton
