import { KeyboardButton, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { apiGetRequest } from "../../api";
import { EmployeeCount, JobType, _city, _country, _sector } from "../../interface/api";

export const sharePhoneNumberMarkup: ReplyKeyboardMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[{
			text: 'Share Phone Number',
			request_contact: true
		} as KeyboardButton]
	]
}

export const cancelButtonMarkup: ReplyKeyboardMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Cancel' }
		]
	]
}

export const skipButtonMarkup: ReplyKeyboardMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Skip' }
		]
	]
}

export const skipAndCancelButtonMarkup: ReplyKeyboardMarkup = {
	one_time_keyboard: true,
	resize_keyboard: true,
	keyboard: [
		[
			{ text: 'Skip' },
			{ text: 'Cancel' },
		]
	]
}

const populateKeyboardList = (list: any[], includeCancel = true, includeSkip = false): KeyboardButton[][] => {
	const keyboard: KeyboardButton[][] = []

	list.sort().forEach((item: string) => {
		keyboard.push([
			{ text: item }
		])
	})


	if (includeCancel || includeSkip) {
		const extra: KeyboardButton[] = []

		if (includeSkip) extra.push({ text: 'Skip' })
		if (includeCancel) extra.push({ text: 'Cancel' })

		keyboard.push(extra)
	}

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

export const jobTypeMarkup = (): ReplyKeyboardMarkup => {
	const markup: ReplyKeyboardMarkup = {
		resize_keyboard: true,
		one_time_keyboard: true,
		keyboard: []
	}

	for (const item of Object.values(JobType)) {
		markup.keyboard.push([
			{ text: item }
		])
	}

	markup.keyboard.push([
		{ text: 'Cancel' }
	])

	return markup
}

export const locationKeyboardMarkup = async (chat_id: number): Promise<ReplyKeyboardMarkup> => {
	const { cities } = await apiGetRequest('eth-city-list', chat_id)

	const reply_markup = {
		one_time_keyboard: true,
		resize_keyboard: true,
		keyboard: [
			[{ text: 'Remote' }],
			...populateKeyboardList(cities.map((city: _city) => city.name), false)
		]
	} as ReplyKeyboardMarkup

	return reply_markup
}
