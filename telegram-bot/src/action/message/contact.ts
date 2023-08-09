import { Chat, Contact, Message } from "node-telegram-bot-api"
import sleep from "../../common/sleep"
import { _user } from "../../interface/api"
import { welcomeMessage } from "../../response/common/welcome.message"
import { deleteMessage, sendTextMessageAndRemoveKeyboard } from "../../response/message/text.message"
import { apiPostRequest } from "../../api"

export const addPhoneNumber = async (user: _user, contact: Contact, chat: Chat, message: Message, update_id?: number) => {
	// add phone to user info
	await apiPostRequest('update-phone', chat.id, contact)

	// send successfull message
	let lastMessage = await sendTextMessageAndRemoveKeyboard({
		chat_id: chat.id,
		text: `Phone number added.`
	}, false)

	await sleep()
	await welcomeMessage(chat)
	await sleep()

	// delete message
	deleteMessage({ chat_id: chat.id, message_id: message.message_id })

	// delete share your phone prompt message
	deleteMessage({ chat_id: chat.id, message_id: user.telegram.lastMessageID })

	deleteMessage({ chat_id: chat.id, message_id: lastMessage.message_id })
}
