import { Chat, Contact, Message } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import { deleteMessage, editTextMessage, sendTextMessage, sendTextMessageAndRemoveKeyboard } from "../../response/message/text.message";
import { apiPostRequest } from "../../api";
import sleep from "../../common/sleep";
import { editWelcomeMessage, welcomeMessage } from "../../response/common/welcome.message";
import logger from "../../common/logger";

// user sent contact
export default async function (user: _user, contact: Contact, chat: Chat, message: Message, update_id?: number) {
	logger.debug(`user ${chat.id} sent contact info (${message.message_id})`)

	// add phone to user info
	await apiPostRequest('update-phone', chat.id, contact)

	// delete message
	await deleteMessage({ chat_id: chat.id, message_id: message.message_id })

	// delete share your phone prompt message
	await deleteMessage({ chat_id: chat.id, message_id: user.telegram.lastMessageID })

	// send successfull message
	await sendTextMessageAndRemoveKeyboard({
		chat_id: chat.id,
		text: `Phone number added.`
	})

	await sleep()

	await welcomeMessage(chat)
}