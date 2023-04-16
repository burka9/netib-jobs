import { KeyboardButton, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { apiGetRequest } from "../../api";
import { EmployeeCount, _city, _country, _sector } from "../../interface/api";

export const sharePhoneNumberMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[{
			text: 'Share Phone Number',
			request_contact: true
		} as KeyboardButton]
	]
} as ReplyKeyboardMarkup

export const cancelButtonMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Cancel' }
		]
	]
} as ReplyKeyboardMarkup

export const skipButtonMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Skip' }
		]
	]
} as ReplyKeyboardMarkup

export const skipAndCancelButtonMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Skip' },
			{ text: 'Cancel' },
		]
	]
} as ReplyKeyboardMarkup

const populateKeyboardList = (list: any[], includeCancel = true): KeyboardButton[][] => {
	const keyboard: KeyboardButton[][] = []

	list.sort().forEach((item: string) => {
		keyboard.push([
			{ text: item }
		])
	})

	if (includeCancel)
		keyboard.push([
			{ text: 'Cancel' }
		])

	return keyboard
}

export const sectorKeyboardMarkup = async (chat_id: number) => {
	const { sectors } = await apiGetRequest('sector-list', chat_id)

	const reply_markup = {
		one_time_keyboard: true,
		resize_keyboard: true,
		keyboard: populateKeyboardList(sectors.map((sector: _sector) => sector.name))
	} as ReplyKeyboardMarkup


	return reply_markup
}

export const countryKeyboardMarkup = async (chat_id: number) => {
	const { countries } = await apiGetRequest('country-list', chat_id)

	const reply_markup = {
		one_time_keyboard: true,
		resize_keyboard: true,
		keyboard: populateKeyboardList(countries.map((country: _country) => country.name))
	} as ReplyKeyboardMarkup

	return reply_markup
}

export const cityKeyboardMarkup = async (chat_id: number) => {
	const { cities } = await apiGetRequest('city-list', chat_id)

	const reply_markup = {
		one_time_keyboard: true,
		resize_keyboard: true,
		keyboard: populateKeyboardList(cities.map((city: _city) => city.name))
	} as ReplyKeyboardMarkup

	return reply_markup
}

export const companySizeKeyboardMarkup = () => {
	const markup: ReplyKeyboardMarkup = {
		one_time_keyboard: true,
		resize_keyboard: true,
		keyboard: []
	}

	for (const [key, value] of Object.entries(EmployeeCount))
		markup.keyboard.push([
			{ text: `${key} - ${value}` }
		])

	markup.keyboard = [...markup.keyboard, [
		// { text: 'Skip' },
		{ text: 'Cancel' },
	]]

	return markup
}