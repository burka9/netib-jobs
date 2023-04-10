import { EditMessageReplyMarkupOptions, Message } from "node-telegram-bot-api"
import response from ".."
import { CustomDeleteMessageOptions, CustomEditMessageOptions, CustomEditMessageReplyMarkupOptions, CustomSendMessageOptions } from "../../interface"
import { updateLastMessageID } from "../../api"

export const sendTextMessage = async (sendMessageOptions: CustomSendMessageOptions, updateLastMessage = true): Promise<Message> => {
	const result = await response('sendMessage', 'POST', sendMessageOptions)

	if (updateLastMessage && result.data.ok) {
		const message = result.data.result as Message
		await updateLastMessageID(message.chat.id, message.message_id)
	}

	return result.data.result
}

export const sendTextMessageAndRemoveKeyboard = async (
	sendMessageOptions: CustomSendMessageOptions,
	updateLastMessage = true,
): Promise<Message> => {
	const options = { ...sendMessageOptions }
	options['reply_markup'] = {...sendMessageOptions['reply_markup'], remove_keyboard: true }

	return sendTextMessage(options, updateLastMessage)
}

export const editTextMessage = async (editMessageOptions: CustomEditMessageOptions): Promise<any> => {
	return response('editMessageText', 'POST', editMessageOptions)
}

export const editMessageReplyMarkup = async (editMessageReplyMarkupOptions: CustomEditMessageReplyMarkupOptions): Promise<any> => {
	return response('editMessageReplyMarkup', 'POST', editMessageReplyMarkupOptions)
}

export const deleteMessage = async (deleteMessageOptions: CustomDeleteMessageOptions): Promise<any> => {
	return response('deleteMessage', 'POST', deleteMessageOptions)
}
