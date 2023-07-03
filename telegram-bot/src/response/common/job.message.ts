import { _company, _jobPost, _temporaryCompany, _temporaryJobPost, _user } from "../../interface/api";
import { ViewTemporaryJobPostInlineKeyboard } from "../markup/inline.keyboard";
import { sendTextMessage } from "../message/text.message";

export const jobPostDetailText = (jobPost: _temporaryJobPost | _jobPost): string => {
	const {
		// city,
		// company,
		// country,
		description,
		employeeCount,
		howToApply,
		id,
		location,
		owner,
		salary,
		sector,
		title,
		type
	} = jobPost

	return (
`<b>Job Title:</b> ${title}

<b>Job Description:</b> ${description}

<b>Job Type:</b> ${type}
<b>Location:</b> ${location}
<b>Sector:</b> ${sector.name}
${employeeCount ? "\n<b>Applicants Needed:</b>: " + employeeCount : ""}${salary ? "\n<b>Salary/Compensation:</b>: " + salary : ""}

-----
<b>How To Apply</b>
${howToApply}
`)
}

export const shortCompanyDetailText = (company: _company | _temporaryCompany) => {
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
`Company details

<b>Name:</b> ${name}

<b>Description:</b> ${description}

<b>Employee Count:</b> ${employeeCount}
<b>Sector:</b> ${sector.name}
<b>Location:</b> ${city.name}, ${country.name}

<b>Contact Information</b>
<b>Email:</b> ${email ? email : ""}
<b>Phone:</b> ${phone ? phone : ""}
`)
}

export const privateDetailText = (user: _user) => {
	const {
		phone,
		email,
		telegram
	} = user

	return (
`Private Client

<b>Contact Information</b>
<b>Email:</b> ${email ? email : ""}
<b>Phone:</b> ${phone ? phone : ""}
<b>Telegram:</b> <a href="tg://user?id=${telegram.chatID}">Contact</a>
`)
}

export const viewTempJobPost = async (user: _user, chat_id: number) => {
	const company = user.companies.find(company => company.id === user.temporaryJobPost.companyId)
	
	const text = `${jobPostDetailText(user.temporaryJobPost)}
----
${company ? shortCompanyDetailText(company) : privateDetailText(user)}
`

	return sendTextMessage({
		chat_id,
		text,
		parse_mode: 'HTML',
		reply_markup: ViewTemporaryJobPostInlineKeyboard
	})
}
