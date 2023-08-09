import { Router } from "express";
import { apiGetRequest } from "./api";
import { TELEGRAM } from "./common/env";
import logger from "./common/logger";
import { _company } from "./interface/api";
import { jobPostDetailText, shortCompanyDetailText, privateDetailText } from "./response/common/job.message";
import { sendTextMessage } from "./response/message/text.message";

export default (router: Router) => {
	router.post('/post-job-to-group', async (req, res) => {
		logger.debug(`incoming request ${req.url}`)

		const { success: userSuccess, user } = await apiGetRequest(`user-info`, req.body.chatID)
		const { success: jobPostSuccess, jobPost } = await apiGetRequest('job-post-single', req.body.chatID, { jobPostId: req.body.jobPostId })
		const company = user.companies.find((company: _company) => company.id === jobPost.company?.id)

		const result = await sendTextMessage({
			chat_id: TELEGRAM.MAIN_GROUP_ID,
			parse_mode: 'HTML',
			text: `${jobPostDetailText(jobPost)}
		----
		${company ? shortCompanyDetailText(company) : privateDetailText(user)}
		`
		}, false)

		res.json({
			success: true,
			messageId: result.message_id,
			chatId: result.chat.id,
			postDate: new Date(result.date * 1000)
		})
	})
}