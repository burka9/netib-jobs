import { CallbackQuery, Message, User } from "node-telegram-bot-api";
import { TelegramStep, _company, _jobPost, _user } from "../../../../interface/api";
import { apiGetRequest, apiPostRequest } from "../../../../api";
import { changeTelegramStep } from "../../../../response/common/telegramStep";
import { editTextMessage, sendTextMessage } from "../../../../response/message/text.message";
import { welcomeMessage } from "../../../../response/common/welcome.message";
import { jobPostDetailText, privateDetailText, shortCompanyDetailText } from "../../../../response/common/job.message";
import { TELEGRAM } from "../../../../common/env";

export default async (user: _user, from: User, callback_query: CallbackQuery, message: Message, update_id?: number) => {
	if (user.telegram.step === TelegramStep.ViewTempJobPost) {
		await changeTelegramStep(from.id, TelegramStep.ConfirmTempJobPost)
		const { success, jobPostId } = await apiPostRequest(`confirm-temp-job-post`, from.id)

		if (success) {
			await editTextMessage({
				chat_id: from.id,
				message_id: message.message_id,
				text: `Job posted. \n\nWaiting for moderator approval. \nYou will be notified about the status of the job post`
			})

			await welcomeMessage(from)

			await postJobToDevGroup(from.id, jobPostId)
		}
	}
}

export const postJobToDevGroup = async (chatID: number, jobPostId: number) => {
	const { success: userSuccess, user} = await apiGetRequest(`user-info`, chatID)
	const { success: jobPostSuccess, jobPost } = await apiGetRequest('job-post-single', chatID, { jobPostId })
	const company = user.companies.find((company: _company) => company.id === jobPost.company?.id)
	
	return sendTextMessage({
		chat_id: TELEGRAM.DEV_GROUP_ID,
		parse_mode: 'HTML',
		text: `${jobPostDetailText(jobPost)}
		----
		${company ? shortCompanyDetailText(company) : privateDetailText(user)}
		`
	}, false)
}