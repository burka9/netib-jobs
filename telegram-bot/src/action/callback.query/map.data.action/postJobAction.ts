import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { _user } from "../../../interface/api";
import { editTextMessage, sendTextMessage } from "../../../response/message/text.message";
import { HowToPostJobInlineKeyboard } from "../../../response/markup/inline.keyboard";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	const text = `How do you want to post a job?

---
<b>Post a Job as private client</b>
Your personal information will be displayed as a contact information

<b>Post a Job as a registered company</b>
Company profile will be displayed as a contact information

`

	if (update_id === -200) // dont edit message
		await sendTextMessage({
			chat_id: from.id,
			parse_mode: 'HTML',
			text,
			reply_markup: HowToPostJobInlineKeyboard
		})

	else
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			parse_mode: 'HTML',
			text,
			reply_markup: HowToPostJobInlineKeyboard
		})
}