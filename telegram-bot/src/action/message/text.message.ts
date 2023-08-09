import { Chat, Message } from "node-telegram-bot-api";
import logger from "../../common/logger";
import { TelegramStep, _user } from "../../interface/api";
import { deleteMessage } from "../../response/message/text.message";
import start from "./map.text/start";
import addPersonalEmail from "./map.text/addPersonalEmail";
import { addCity, addCompanyDescription, addCompanyEmail, addCompanyPhone, addCompanySize, addCompanyTitle, addCompanyWebsite, addCountry, addSector } from "./map.text/company.text/temporaryCompany";
import { addTempHowToApply, addTempJobDescription, addTempJobEmployeeCount, addTempJobLocation, addTempJobSalary, addTempJobSector, addTempJobTitle, addTempJobType } from "./map.text/post.job/temporaryJobPost";
import { DEVELOPMENT, TELEGRAM } from "../../common/env";
import { postJobToDevGroup } from "../callback.query/map.data.action/post.job.action/confrimTempJobPostAction";

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
		case TelegramStep.TempJobTitle:
			await addTempJobTitle(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobDescription:
			await addTempJobDescription(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobEmployeeCount:
			await addTempJobEmployeeCount(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobSalary:
			await addTempJobSalary(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobSector:
			await addTempJobSector(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobType:
			await addTempJobType(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobLocation:
			await addTempJobLocation(user, text, chat, message, update_id)
			break
		case TelegramStep.TempJobHowToApply:
			await addTempHowToApply(user, text, chat, message, update_id)
			break
		default:
			// dev post
			if (DEVELOPMENT && chat.id === TELEGRAM.DEV_ADMIN_ID) {
				const [text1, text2] = text.split(" ")
				
				if (text1 === "/post" && !isNaN(Number(text2))) {
					try {
						await postJobToDevGroup(chat.id, Number(text2))
					} catch (err: any) {
						console.error(err)
					}
				}
			}
			// dev post end
			
			// delete message
			try {
				await deleteMessage({
					chat_id: chat.id,
					message_id: message?.message_id
				})
			} catch {}
	}
}

export const defaultAction = defaultTextMessageAction
export const textMessageActionMap = textMessageAction
