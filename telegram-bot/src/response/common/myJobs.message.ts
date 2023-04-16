import { Chat, User } from "node-telegram-bot-api";
import { editTextMessage, sendTextMessage } from "../message/text.message";
import { myJobsInlineKeyboard } from "../markup/inline.keyboard";
import { updateLastCallbackMessageID } from "../../api";

export const myJobsMessage = async (chat_id: number): Promise<any> => {
	const lastMessage = await sendTextMessage({
		chat_id,
		text:
`Select an option

👇👇
`,
		reply_markup: myJobsInlineKeyboard
	})

	// update the last callback message ID
	return updateLastCallbackMessageID(chat_id, lastMessage.message_id)
}

export const myJobsMessageEdit = async (chat_id: number, message_id: number): Promise<any> => editTextMessage({
	chat_id,
	message_id,
	text:
		`Select an option

👇👇
`,
	reply_markup: myJobsInlineKeyboard
})
