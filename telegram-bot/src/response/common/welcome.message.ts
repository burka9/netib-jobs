import { Chat, User } from "node-telegram-bot-api"
import { editTextMessage, sendTextMessage } from "../message/text.message"
import { mainMenuInlineKeyboard } from "../markup/inline.keyboard"

const welcomeText = (first_name?: string): string => `Hello<b> ${first_name}</b>!

Welcome to Netib Jobs.

Select an option.
`

export const welcomeMessage = async (chat: Chat): Promise<any> => sendTextMessage({
	chat_id: chat.id,
	parse_mode: 'HTML',
	text: welcomeText(chat.first_name),
	reply_markup: mainMenuInlineKeyboard
})

export const editWelcomeMessage = async (chat: Chat, message_id: number): Promise<any> => editTextMessage({
	chat_id: chat.id,
	parse_mode: 'HTML',
	text: welcomeText(chat.first_name),
	message_id,
	reply_markup: mainMenuInlineKeyboard
})
