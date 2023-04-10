import { User, CallbackQuery, Message } from "node-telegram-bot-api"
import { TELEGRAM } from "../../../common/env"
import { _user } from "../../../interface/api"
import { termsAndConditionInlineKeyboard } from "../../../response/markup/inline.keyboard"
import { editTextMessage } from "../../../response/message/text.message"
import { sharePersonalEmail } from ".."
import { myJobsMessage, myJobsMessageEdit } from "../../../response/common/myJobs.message"

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	const { agreementDate, agreementLink, agreementSignature, agreementString } = user.policy
	
	if (agreementDate && agreementLink && agreementSignature && agreementString) { // user has agreed to policy
		if (user.email) { // user has entered email and can continue
			await myJobsMessageEdit(from.id, message.message_id)
		} else {
			await sharePersonalEmail(user, from, true)
		}

	} else { // user has not agreed to policy
		await editTextMessage({
			chat_id: from.id,
			message_id: message.message_id,
			text:
`Review Terms and Conditions of our company before continuing.

View here 👉 <a href="${TELEGRAM.AGREEMENT_LINK}">Terms and condition</a>
`,
			parse_mode: 'HTML',
			reply_markup: termsAndConditionInlineKeyboard
		})
	}
}
