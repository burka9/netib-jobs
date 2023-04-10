import { Chat, User } from "node-telegram-bot-api";
import { editTextMessage, sendTextMessage } from "../message/text.message";
import { myJobsInlineKeyboard } from "../markup/inline.keyboard";

export const myJobsMessage = async (chat_id: number): Promise<any> => sendTextMessage({
	chat_id,
	text:
`Select an option

👇👇
`,
	reply_markup: myJobsInlineKeyboard
})

export const myJobsMessageEdit = async (chat_id: number, message_id: number): Promise<any> => editTextMessage({
	chat_id,
	message_id,
	text:
`Select an option

👇👇
`,
	reply_markup: myJobsInlineKeyboard
})
