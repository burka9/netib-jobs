import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { editTextMessage, sendTextMessage } from "../../../../response/message/text.message";
import { cancelButtonMarkup } from "../../../../response/markup";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	await changeTelegramStep(from.id, TelegramStep.PostJob)

	await editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		text:
`Enter job details to continue.
`,
	})

	await changeTelegramStep(from.id, TelegramStep.TempJobTitle)

	await sendTextMessage({
		chat_id: from.id,
		text: `Job Title`,
		reply_markup: cancelButtonMarkup
	}, false)
}