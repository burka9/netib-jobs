import { Chat, Message } from "node-telegram-bot-api";
import logger from "../../common/logger";
import { TelegramStep, _user } from "../../interface/api";
import { deleteMessage } from "../../response/message/text.message";
import start from "./map.text/start";
import addPersonalEmail from "./map.text/addPersonalEmail";
import { addCity, addCompanyDescription, addCompanyEmail, addCompanyPhone, addCompanySize, addCompanyTitle, addCompanyWebsite, addCountry, addSector } from "./map.text/company.text/temporaryCompany";

interface TextMessageAction {
	[key: string]: (user: _user, chat: Chat, message: Message, update_id?: number) => Promise<void>;
}

const textMessageAction: TextMessageAction = {
	'/start': start,
}

const defaultTextMessageAction = async (
	user: _user,
	text: string,
	chat: Chat,
	message: Message,
	update_id?: number
) => {
	logger.debug(`unknow text message: ${text}`)
	// handle text messages based on telegram flow
	switch (user.telegram.step) {
		case TelegramStep.WaitingPersonalEmail:
			await addPersonalEmail(user, text, chat, message, update_id)
			break
		case TelegramStep.CompanyName:
			await addCompanyTitle(user, text, chat, message, update_id)
			break
		case TelegramStep.CompanyDescription:
			await addCompanyDescription(user, text, chat, message, update_id)
			break
		case TelegramStep.Sector:
			await addSector(user, text, chat, message, update_id)
			break
		case TelegramStep.Country:
			await addCountry(user, text, chat, message, update_id)
			break
		case TelegramStep.City:
			await addCity(user, text, chat, message, update_id)
			break
		case TelegramStep.EmployeeCount:
			await addCompanySize(user, text, chat, message, update_id)
			break
		case TelegramStep.CompanyEmail:
			await addCompanyEmail(user, text, chat, message, update_id)
			break
		case TelegramStep.CompanyPhone:
			await addCompanyPhone(user, text, chat, message, update_id)
			break
		case TelegramStep.CompanyWebsite:
			await addCompanyWebsite(user, text, chat, message, update_id)
			break
		default:
			// delete message
			await deleteMessage({
				chat_id: chat.id,
				message_id: message?.message_id
			})
	}
}

export const defaultAction = defaultTextMessageAction
export const textMessageActionMap = textMessageAction
