import { _user } from "../../interface/api"
import { cancelButtonMarkup, locationKeyboardMarkup, skipAndCancelButtonMarkup } from "../markup"
import { HowToApplyInlineKeyboard } from "../markup/inline.keyboard"
import { sendTextMessage } from "../message/text.message"

export const sendValidEmail = async (
	chat_id: number,
	text = 'Please send a valid email address'
) => await sendTextMessage({ chat_id, text }, false)

export const registeredEmail = async (
	chat_id: number,
	text = 'Email address is already registered to another user'
) => await sendTextMessage({ chat_id, text }, false)

export const companyEmail = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `Company Email`,
	reply_markup: skipAndCancelButtonMarkup
})

export const sendValidPhone = async (
	chat_id: number,
	text = 'Please send a valid phone number'
) => await sendTextMessage({ chat_id, text })

export const companyPhone = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `Company Phone`,
	reply_markup: skipAndCancelButtonMarkup
})

export const sendValidWebsite = async (
	chat_id: number,
	text = 'Please send a valid website url'
) => await sendTextMessage({ chat_id, text })

export const companyWebsite = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `Company Website`,
	reply_markup: skipAndCancelButtonMarkup
})

export const tempJobSalary = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `Salary/Compensation`,
	reply_markup: skipAndCancelButtonMarkup
})

export const tempJobLocation = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `Job Location`,
	reply_markup: await locationKeyboardMarkup(chat_id)
})

export const tempJobHowToApply = async (chat_id: number) => sendTextMessage({
	chat_id,
	text: `How to apply?
	
Tell applicants how they should apply to the job. You can also send a google form link (if any)?


(For private clients only)
Applicants can contact you on directly on telegram using your phone number.
`,
	parse_mode: 'HTML',
	reply_markup: skipAndCancelButtonMarkup
})