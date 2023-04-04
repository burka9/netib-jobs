import axios, { AxiosResponse } from 'axios'
import { TELEGRAM } from '../common/env'

const TELEGRAM_URL = TELEGRAM.API
const TOKEN = TELEGRAM.BOT_TOKEN

export default function (
	endpoint: string,
	method = 'GET',
	data?: any,
	params?: any,
	headers?: any
): Promise<AxiosResponse> {
	let url = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	url = `${TELEGRAM_URL}/bot${TOKEN}/${url}`
	
	return axios({
		method,
		url,
		data,
		params,
		headers
	})
}