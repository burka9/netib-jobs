import axios, { AxiosResponse } from 'axios'
import { TELEGRAM } from '../common/env'
import logger from '../common/logger'

const TELEGRAM_URL = TELEGRAM.API
const TOKEN = TELEGRAM.BOT_TOKEN

axios.interceptors.response.use(
	function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Handle any network error
    if (error.message === "Network Error") {
      logger.error("Network error occurred. Please check your connection.");
      return Promise.reject(error);
    }

    // Handle HTTP errors
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          logger.error("Unauthorized access.");
          break;
        case 404:
          logger.error("Resource not found.");
          break;
        default:
          logger.error("HTTP error occurred: " + status);
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
)

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