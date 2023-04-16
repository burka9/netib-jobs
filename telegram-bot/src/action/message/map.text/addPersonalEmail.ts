import { Chat, Message } from "node-telegram-bot-api";
import { _user } from "../../../interface/api";
import { apiPostRequest } from "../../../api";
import EmailValidator from "email-validator";
import { deleteMessage, editTextMessage, sendTextMessage } from "../../../response/message/text.message";
import { sharePersonalEmail } from "../../callback.query";
import { myJobsMessage } from "../../../response/common/myJobs.message";
import { registeredEmail, sendValidEmail } from "../../../response/common";

export default async (user: _user, text: string, chat: Chat, message: Message, update_id?: number) => {
	if (EmailValidator.validate(text)) { // user has sent a valid email address
		let { success, message: responseMessage } = await apiPostRequest('add-personal-email', chat.id, { email: text })

		if (!success) { // user has a duplicate email
			if (responseMessage === 'email is registered') {
				await registeredEmail(chat.id)
			}
			else if (responseMessage === 'invalid email') {
				await sendValidEmail(chat.id)
			}
			await deleteMessage({ chat_id: chat.id, message_id: user.telegram.lastMessageID })
			return sharePersonalEmail(user, chat)
		} else {
			// email is added to the user
			await sendTextMessage({
				chat_id: chat.id,
				text: 'Email address added.'
			})
			
			await deleteMessage({ chat_id: chat.id, message_id: user.telegram.lastMessageID })
			return myJobsMessage(chat.id)
		}
	} else { // invalid email address
		await sendValidEmail(chat.id)
		await deleteMessage({ chat_id: chat.id, message_id: user.telegram.lastMessageID })
		return sharePersonalEmail(user, chat)
	}
}
