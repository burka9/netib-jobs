import { apiPostRequest } from "../../api"
import { TelegramStep } from "../../interface/api"

export const changeTelegramStep = async (chat_id: number, step: TelegramStep): Promise<boolean> => {
	let { success } = await apiPostRequest('telegram-step', chat_id, { step })

	return success
}
