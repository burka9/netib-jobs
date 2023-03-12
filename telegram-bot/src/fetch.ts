import axios from 'axios'
import { TELEGRAM } from './env'

const TELEGRAM_URL = TELEGRAM.API
const TOKEN = TELEGRAM.BOT_TOKEN

export default function (url: string, method = 'GET', data?:any, params?: any): Promise<any> {
	return axios({
		method,
		url: `${TELEGRAM_URL}/bot${TOKEN}/${url}`,
		data,
		params,
	})
}