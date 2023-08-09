import { Chat, User } from "node-telegram-bot-api"
import { editTextMessage, sendTextMessage } from "../message/text.message"
import { mainMenuInlineKeyboard } from "../markup/inline.keyboard"
import { TelegramStep } from "../../interface/api"
import { changeTelegramStep } from "./telegramStep"
import { updateLastCallbackMessageID } from "../../api"

const welcomeText = (first_name?: string): string => `Hello<b> ${first_name}</b>!

Welcome to Netib Jobs.

Select an option.
`

export const welcomeMessage = async (chat: Chat | User): Promise<any> => {
	// send request to backend to reset attributes to default
	await changeTelegramStep(chat.id, TelegramStep.Default)

	const lastMessage = await sendTextMessage({
		chat_id: chat.id,
		parse_mode: 'HTML',
		text: welcomeText(chat.first_name),
		reply_markup: mainMenuInlineKeyboard
	})

	// update the last callback message ID
	return updateLastCallbackMessageID(chat.id, lastMessage.message_id)
}

export const editWelcomeMessage = async (chat: Chat | User, message_id?: number | string): Promise<any> => {
	// send request to backend to reset attributes to default
	await changeTelegramStep(chat.id, TelegramStep.Default)

	const lastMessage = await editTextMessage({
		chat_id: chat.id,
		parse_mode: 'HTML',
		text: welcomeText(chat.first_name),
		message_id: typeof(message_id) === 'number' ? message_id : undefined,
		inline_message_id: typeof(message_id) === 'string' ? message_id : undefined,
		reply_markup: mainMenuInlineKeyboard
	})

	// update the last callback message ID
	return updateLastCallbackMessageID(chat.id, lastMessage.message_id)
}
