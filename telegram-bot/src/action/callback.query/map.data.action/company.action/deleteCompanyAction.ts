import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../../../interface/api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { editTextMessage } from "../../../../response/message/text.message";
import { companyDetailText, myCompanyMessage } from "../../../../response/common/company.message";

export default async (
	user: _user,
	id: number,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	// await changeTelegramStep(from.id, TelegramStep.DeleteCompany)
	
	const company = user.companies.find(c => c.id === id)

	if (!company) {
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text: `Something went wrong.`
		})
		return myCompanyMessage(user, from.id)
	}
}