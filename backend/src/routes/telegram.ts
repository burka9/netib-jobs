import { Application } from "express";
import { RouteConfig } from "../common/route.config";
import telegram from "../controller/telegram";

export class TelegramRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'TelegramrRoutes')
	}

	registerRoute(): Application {
		this.app.use('/telegram/:chatID', this.router)
		this.app.param('chatID', telegram.chatIDParam)

		return this.app
	}

	configureRoutes(): void {
		// GET
		this.router.get('/user-info', telegram.userInfo)
		this.router.get('/sector-list', telegram.sectorList)
		this.router.get('/country-list', telegram.countryList)
		this.router.get('/city-list', telegram.cityList)
		this.router.get('/eth-city-list', telegram.ethCityList)
		this.router.get('/job-post-single', telegram.jobPostSingle)
		
		// POST
		this.router.post('/register-user', telegram.registerUser)
		this.router.post('/update-last-message-id', telegram.updateLastMessageID)
		this.router.post('/update-last-callback-message-id', telegram.updateLastCallbackMessageID)
		this.router.post('/update-phone', telegram.updatePhone)
		this.router.post('/agree-term-and-condition', telegram.agreeTermAndCondition)
		this.router.post('/telegram-step', telegram.telegramStep)
		this.router.post('/add-personal-email', telegram.addPersonalEmail)
		this.router.post('/temporary-company', telegram.temporaryCompany)
		this.router.post('/add-temporary-company', telegram.addTemporaryCompany)
		this.router.post('/set-edit-company-id', telegram.setEditCompanyID)
		this.router.post('/temporary-job-post', telegram.temporaryJobPost)
		this.router.post('/confirm-temp-job-post', telegram.confirmTempJobPost)
	}
}
