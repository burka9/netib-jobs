import { _company, _temporaryCompany, _user } from "../../interface/api"
import { MyCompanyInlineKeyboard, ViewTemporaryCompanyInlineKeyboard } from "../markup/inline.keyboard"
import { editTextMessage, sendTextMessage } from "../message/text.message"

export const companyDetailText = (company: _company | _temporaryCompany) => {
	const {
		name,
		city,
		country,
		description,
		email,
		employeeCount,
		phone,
		sector,
		website,
	} = company

	return (
`<b>Name:</b> ${name}

<b>Description:</b> ${description}

<b>Employee Count:</b> ${employeeCount}
<b>Sector:</b> ${sector.name}
<b>Location:</b> ${city.name}, ${country.name}

<b>Email:</b> ${email ? email : ""}
<b>Phone:</b> ${phone ? phone : ""}
<b>Website:</b> ${website ? website : ""}
`)
}

export const viewTemporaryCompany = async (user: _user, chat_id: number) => {
	return sendTextMessage({
		chat_id: chat_id,
		parse_mode: "HTML",
		text:
`You new company details
-------------------------

${companyDetailText(user.temporaryCompany)}
`,
		reply_markup: ViewTemporaryCompanyInlineKeyboard
	})
}

export const myCompanyMessageText: string = `Companies you have registered with us.

You can have maximum of 3 companies registered.
`

export const myCompanyMessage = async (user: _user, chat_id: number, message_id?: number) => (message_id ? editTextMessage : sendTextMessage)({
	chat_id, message_id,
	text: myCompanyMessageText,
	reply_markup: MyCompanyInlineKeyboard(user)
})