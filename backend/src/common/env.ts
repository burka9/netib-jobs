import dotenv from 'dotenv'
import { LoggerOptions } from 'typeorm/logger/LoggerOptions'
import { base64ToString } from './string'

dotenv.config()

export const DEVELOPMENT = process.env.ENVIRONMENT?.toUpperCase() === 'DEVELOPMENT'
export const ENVIRONMENT = process.env.ENVIRONMENT
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || '10')

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

function getDatabaseLogs(): LoggerOptions {
	let defaultLogs = ["info", "warn", "error", "log"]
	let logs

	try {
		logs = (process.env.DB_LOG as string).trim().split(',')
		logs.forEach(log => log = log.trim())
	} catch {}

	return (logs || defaultLogs) as LoggerOptions
}

export type CustomDatabaseType = 'mysql' | 'mariadb' | 'postgres'

function getDatabaseType(): CustomDatabaseType {
	const types = ['mysql', 'mariadb', 'postgres']

	return (types.find(type => type === process.env.DB_TYPE) || types[0]) as CustomDatabaseType
}

export const DATABASE = {
	TYPE: getDatabaseType(),
	HOST: process.env.DB_HOST || 'localhost',
	PORT: Number(process.env.DB_PORT || '3306'),
	NAME: base64ToString(process.env.DB_NAME || 'bmV0aWJfam9icw=='),
	USER: base64ToString(process.env.DB_USER || 'cm9vdA=='),
	PASSWORD: base64ToString(process.env.DB_PASSWORD || ''),
	MIN_POOL: Number(process.env.DB_MIN_POOL || 1),
	MAX_POOL: Number(process.env.DB_MAX_POOL || 4),
	LOG: getDatabaseLogs(),
	SYNC: process.env.DB_SYNCHRONIZE === 'true',
	DROP_SCHEMA: process.env.DB_DROP_SCHEMA === 'true' && DEVELOPMENT,
}

export const KEY = {
	PRIVATE: process.env.PRIVATE_KEY || "",
	PUBLIC: process.env.PUBLIC_KEY || "",
}

export const TELEGRAM = {
	HANDLER_URL: process.env.TELEGRAM_HANDLER_URL || 'https://bot.netibjobs.com',
}