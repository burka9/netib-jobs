import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../interface/api";
import { apiPostRequest } from "../../../api";
import { TELEGRAM } from "../../../common/env";
import { editTextMessage, sendTextMessage } from "../../../response/message/text.message";
import { sharePersonalEmail } from "..";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	await apiPostRequest('agree-term-and-condition', from.id, {
		link: TELEGRAM.AGREEMENT_LINK
	})

	await editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		text:
`Agreement accepted.

use \/link to get agreement signature
`
	})

	// check if user has email
	if (user.email) { // user has email
	} else { // user has no email, ask for email
		await sharePersonalEmail(user, from, true)
	}
}
