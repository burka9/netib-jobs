import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { _user } from "../../../../interface/api";
import { editTextMessage, sendTextMessage } from "../../../../response/message/text.message";
import { companyDetailText, myCompanyMessage } from "../../../../response/common/company.message";
import { ViewCompanyInlineKeyboard } from "../../../../response/markup/inline.keyboard";
import { apiPostRequest } from "../../../../api";

export default async (
	user: _user,
	id: number,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	const company = user.companies.find(c => c.id === id)
	
	if (!company) {
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: 'Something went wrong'
		})

		return myCompanyMessage(user, from.id)
	}

	await apiPostRequest('set-edit-company-id', from.id, { id: null })
	await editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		parse_mode: 'HTML',
		text:
`${companyDetailText(company)}
`,
		reply_markup: ViewCompanyInlineKeyboard(company.id)
	})
}
