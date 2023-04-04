import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { BACKEND } from "../common/env";

export function apiRequest(
	endpoint: string,
	method = 'GET',
	data?: object,
	params?: any,
	headers?: AxiosHeaders
): Promise<AxiosResponse> {
	let url = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	url = `${BACKEND.URL}/${url}`
	
	return axios({
		method,
		url,
		data,
		params,
		headers
	})
}

export async function apiGetRequest(
	endpoint: string,
	chatID: number | string,
	params?: any,
	headers?: AxiosHeaders,
	data?: object
): Promise<any> {
	endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	return (await apiRequest(`/telegram/${chatID}/${endpoint}`, 'GET', data, params, headers)).data
}

export async function apiPostRequest(
	endpoint: string,
	chatID: number | string,
	data?: object,
	headers?: AxiosHeaders,
	params?: any,
): Promise<any> {
	endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	return (await apiRequest(`/telegram/${chatID}/${endpoint}`, 'POST', data, params, headers)).data
}

export async function apiPutRequest(
	endpoint: string,
	chatID: number | string,
	data?: object,
	headers?: AxiosHeaders,
	params?: any,
): Promise<any> {
	endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	return (await apiRequest(`/telegram/${chatID}/${endpoint}`, 'PUT', data, params, headers)).data
}

export async function apiDeleteRequest(
	endpoint: string,
	chatID: number | string,
	data?: object,
	headers?: AxiosHeaders,
	params?: any,
): Promise<any> {
	endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
	return (await apiRequest(`/telegram/${chatID}/${endpoint}`, 'DELETE', data, params, headers)).data
}
