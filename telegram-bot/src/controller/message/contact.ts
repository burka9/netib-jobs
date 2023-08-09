import { Chat, Contact, Message } from "node-telegram-bot-api";
import { _user } from "../../interface/api";
import { deleteMessage, editTextMessage, sendTextMessage, sendTextMessageAndRemoveKeyboard } from "../../response/message/text.message";
import { apiPostRequest } from "../../api";
import sleep from "../../common/sleep";
import { editWelcomeMessage, welcomeMessage } from "../../response/common/welcome.message";
import logger from "../../common/logger";
import { addPhoneNumber } from "../../action/message/contact";

// user sent contact
export default async function (user: _user, contact: Contact, chat: Chat, message: Message, update_id?: number) {
	logger.debug(`user ${chat.id} sent contact info (${message.message_id})`)

	return addPhoneNumber(user, contact, chat, message, update_id)
}