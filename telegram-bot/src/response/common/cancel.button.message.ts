import { Chat, User } from "node-telegram-bot-api"
import { TelegramStep } from "../../interface/api"
import { sendTextMessageAndRemoveKeyboard } from "../message/text.message"
import { changeTelegramStep } from "./telegramStep"
import { welcomeMessage } from "./welcome.message"

export const isCancel = (text: string): boolean => text.toLowerCase() === "Cancel".toLowerCase()

export default async (chat: Chat | User) => {
	await sendTextMessageAndRemoveKeyboard({
		chat_id: chat.id,
		text: `Canceled`
	})

	await changeTelegramStep(chat.id, TelegramStep.Default)
	await welcomeMessage(chat)
}
