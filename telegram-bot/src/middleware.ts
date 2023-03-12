import { NextFunction, Request, Response } from "express"

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	console.error(error)
	if (error.name === 'QueryFailedError') {
		return res.status(400).json({ message: 'Bad Request', code: (error as any).code })
	} else if (error.name === 'custom') {
		return res.status((error as any).code || 400).json({ message: error.message })
	}
	return res.status(500).json({ message: 'Server error' })
}
