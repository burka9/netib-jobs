import { NextFunction, Request, Response } from "express"
import { CustomError, CustomErrorName } from "../common/customError"
import logger from "../common/logger"

export function errorHandler(error: Error | CustomError, req: Request, res: Response, next: NextFunction) {
	logger.error(`Route "${req.url}": ${error}`)
	if (error.name === 'QueryFailedError') {
		return res.status(400).json({ message: 'Bad Request', code: (error as any).code })
	} else if (error.name === CustomErrorName) {
		return res.status((error as any).code || 400).json({ message: error.message })
	}
	return res.status(500).json({ message: error.message || 'Server error' })
}
