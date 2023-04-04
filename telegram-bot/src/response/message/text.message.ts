import response from ".."
import { CustomSendMessageOptions } from "../../interface"

	export const sendTextMessage = (sendMessageOptions: CustomSendMessageOptions) => {
		return response('sendMessage', 'POST', sendMessageOptions)
	}
	