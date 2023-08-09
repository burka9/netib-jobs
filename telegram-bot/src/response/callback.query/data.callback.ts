import { AnswerCallbackQueryOptions } from "node-telegram-bot-api"
import response from ".."

export const emptyAnswerCallbackQuery = async (callback_query_id: string): Promise<any> => {
	const options: AnswerCallbackQueryOptions = { callback_query_id }

	try {
		await response('answerCallbackQuery', 'POST', options)
	} catch {
	}
}
