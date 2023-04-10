import { KeyboardButton, ReplyKeyboardMarkup } from "node-telegram-bot-api";

export const sharePhoneNumberMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[{
			text: 'Share Phone Number',
			request_contact: true
		} as KeyboardButton]
	]
} as ReplyKeyboardMarkup
