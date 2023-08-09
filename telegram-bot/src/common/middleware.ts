import { NextFunction, Request, Response } from "express"
import logger from "./logger"
import { apiGetRequest, apiPostRequest } from "../api"
import { Update } from "node-telegram-bot-api"

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	logger.error(error.message)
	if (error.name === 'QueryFailedError') {
		return res.status(400).json({ message: 'Bad Request', code: (error as any).code })
	} else if (error.name === 'custom') {
		return res.status((error as any).code || 400).json({ message: error.message })
	}
	return res.status(500).json({ message: 'Server error' })
}

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
	try {
		const update = req.body as Update

		// only proceed if it is from private chats
		if (update.message?.chat.type === "private" || update.callback_query?.message?.chat.type === "private") {}
		else {
			return res.end()
		}
		
		const chatID = (update.message?.chat.id || update.callback_query?.from.id) as number

		const { user } = await apiGetRequest(`user-info`, chatID)

		if (user) { // user is registered
			logger.debug(`user ${chatID} is registered`)
			res.locals.user = user
		} else { // user is not registered
			logger.debug(`user ${chatID} is not registered`)
			let { success } = await apiPostRequest('register-user', chatID, {
				chat_id: chatID,
				first_name: (update.message?.chat.first_name || update.callback_query?.from.first_name),
				username: (update.message?.chat.username || update.callback_query?.from.username),
				last_name: (update.message?.chat.last_name || update.callback_query?.from.last_name),
			})

			const { user } = await apiGetRequest(`user-info`, chatID)
			res.locals.user = user
			logger.debug(`user registered: ${success}`)
		}

	} catch {
	}

	next()
}