import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { editTextMessage } from "../../../../response/message/text.message";
import { companyDetailText, myCompanyMessage } from "../../../../response/common/company.message";
import { CancelEditCompanyAttribute, EditCompanyInlineKeyboard } from "../../../../response/markup/inline.keyboard";
import { EditTypeAttribute } from "../../../../response/markup/inline.button";
import { apiPostRequest } from "../../../../api";

type my_array = [number, string]

export default async (
	user: _user,
	[id, text]: my_array,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	const company = user.companies.find(c => c.id === id)

	if (!company) {
		await apiPostRequest('set-edit-company-id', from.id, { id })
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: `Something went wrong.`
		})
		return myCompanyMessage(user, from.id)
	}

	if (!text) {
		await changeTelegramStep(from.id, TelegramStep.EditCompany)
		await apiPostRequest('set-edit-company-id', from.id, { id })
		return editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			parse_mode: 'HTML',
			text: companyDetailText(company),
			reply_markup: EditCompanyInlineKeyboard(company.id)
		})
	}

	let replyText: string = ''

	switch (text) {
		case 'name':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyName)
			replyText = 'Edit Name'
			break
		case 'sector':
			await changeTelegramStep(from.id, TelegramStep.EditCompanySector)
			replyText = 'Edit Sector'
			break
		case 'description':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyDescription)
			replyText = 'Edit Description'
			break
		case 'email':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyEmail)
			replyText = 'Edit Email'
			break
		case 'employeeCount':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyEmployeeCount)
			replyText = 'Edit Employee Count'
			break
		case 'location':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyLocation)
			replyText = 'Edit Location'
			break
		case 'phone':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyPhone)
			replyText = 'Edit Phone'
			break
		case 'website':
			await changeTelegramStep(from.id, TelegramStep.EditCompanyWebsite)
			replyText = 'Edit Website'
			break
		default:
			return
	} // swtich

	return editTextMessage({
		chat_id: from.id,
		message_id: message.message_id,
		text: replyText,
		reply_markup: CancelEditCompanyAttribute(id)
	})
}