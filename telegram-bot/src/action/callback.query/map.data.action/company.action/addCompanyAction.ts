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
	await changeTelegramStep(from.id, TelegramStep.AddCompany)

	await editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		text:
`Enter your company details to continue.
`,
	})

	await changeTelegramStep(from.id, TelegramStep.CompanyName)

	await sendTextMessage({
		chat_id: from.id,
		text: `Company Name`,
		reply_markup: cancelButtonMarkup
	}, false)
}
