import dotenv from 'dotenv'

dotenv.config()

export const DEVELOPMENT = process.env.ENVIRONMENT?.toUpperCase() === 'DEVELOPMENT'
export const ENVIRONMENT = process.env.ENVIRONMENT

export const LOG = {
	LEVEL: process.env.LOG_LEVEL || 'info',
	LOG_FILE: process.env.LOG_FILE,
	LOG_TO_CONSOLE: process.env.LOG_TO_CONSOLE === "true",
	LOG_MAX_SIZE: Number(process.env.LOG_MAX_SIZE || '10000000'),
	LOG_MAX_FILES: Number(process.env.LOG_MAX_FILES || '10'),
}

export const SERVER = {
	HOST: process.env.SERVER_HOST || '0.0.0.0',
	PORT: Number(process.env.SERVER_PORT || '3000'),
}

export const WEBHOOK = {
	ORIGIN: process.env.WEBHOOK_ORIGIN || 'https://bot.netibjobs.com',
	HREF: process.env.WEBHOOK_HREF || '/default-webhook-endpoint'
}

export const TELEGRAM = {
	API: process.env.TELEGRAM_URL || 'https://api.telegram.org',
	BOT_TOKEN: process.env.BOT_TOKEN || '',
}

export const BACKEND = {
	URL: process.env.BACKEND_SERVER_URL || 'http://localhost:3000'
}
