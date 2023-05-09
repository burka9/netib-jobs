import { NextFunction, Request, Response } from "express";
import { Database } from "../database";
import { User } from "../entity/user.entity";
import { TelegramStep, UserTelegram } from "../entity/user.telegram.entity";
import { goodRequest, noGoodRequest } from "../common/response";
import logger from "../common/logger";
import { UserPolicy } from "../entity/user.policy.entity";
import { httpsGetAsync } from "../common/httpsAsync";
import { v4 as uuid } from "uuid";
import EmailValidator from "email-validator";
import { TemporaryCompany } from "../entity/temporary.company.entity";
import { Company, EmployeeCount } from "../entity/company.entity";
import { Sector } from "../entity/sector.entity";
import { Country } from "../entity/country.entity";
import { City } from "../entity/city.entity";
import { UserVariable } from "../entity/user.variable.entity";
import { JobType, TemporaryJobPost } from "../entity/temporary.job.post.entity";
import { JobPost } from "../entity/job.post.entity";

const UserRepo = Database.getRepository(User)
const UserTelegramRepo = Database.getRepository(UserTelegram)
const UserPolicyRepo = Database.getRepository(UserPolicy)
const TemporaryCompanyRepo = Database.getRepository(TemporaryCompany)
const SectorRepo = Database.getRepository(Sector)
const CountryRepo = Database.getRepository(Country)
const CityRepo = Database.getRepository(City)
const CompanyRepo = Database.getRepository(Company)
const UserVariableRepo = Database.getRepository(UserVariable)
const TemporaryJobPostRepo = Database.getRepository(TemporaryJobPost)
const JobPostRepo = Database.getRepository(JobPost)

class telegramController {
	async chatIDParam(req: Request, res: Response, next: NextFunction, chatID: string) {
		logger.debug(`chatID param middleware: ${req.url}`)

		if (!chatID) return noGoodRequest(res)

		const user = await UserRepo.findOne({
			where: {
				telegram: { chatID }
			},
			relations: [
				"telegram",
				"policy",
				"companies",
				"companies.sector", "companies.city", "companies.country",
				"temporaryCompany",
				"temporaryCompany.sector", "temporaryCompany.city", "temporaryCompany.country",
				"variable",
				"temporaryJobPost",
				"temporaryJobPost.sector"
			]
		})

		res.locals.user = user

		next()
	}

	async userInfo(req: Request, res: Response) {
		logger.debug(`user info request: ${req.url}`)
		goodRequest(res, ['user', res.locals.user])
	}

	async registerUser(req: Request, res: Response) {
		logger.debug(`register user request: ${req.url}`)
		const { chat_id, first_name, username, last_name } = req.body

		if (!chat_id && !first_name) return noGoodRequest(res, 'incomplete data')

		if (res.locals.user) return noGoodRequest(res, 'user is registered')

		const user = new User()
		const telegram = new UserTelegram()
		const policy = new UserPolicy()
		const tempCompany = new TemporaryCompany()
		const variable = new UserVariable()
		const tempJobPost = new TemporaryJobPost()

		telegram.chatID = chat_id
		telegram.username = username
		telegram.firstName = first_name
		telegram.lastName = last_name

		await UserRepo.save(user)
		await UserTelegramRepo.save(telegram)
		await UserPolicyRepo.save(policy)
		await TemporaryCompanyRepo.save(tempCompany)
		await UserVariableRepo.save(variable)
		await TemporaryJobPostRepo.save(tempJobPost)

		user.telegram = telegram
		user.policy = policy
		user.temporaryCompany = tempCompany
		user.variable = variable
		user.temporaryJobPost = tempJobPost

		telegram.user = user
		policy.user = user
		tempCompany.owner = user
		variable.user = user
		tempJobPost.owner = user

		await UserRepo.save(user)
		await UserTelegramRepo.save(telegram)
		await UserPolicyRepo.save(policy)
		await TemporaryCompanyRepo.save(tempCompany)
		await UserVariableRepo.save(variable)
		await TemporaryJobPostRepo.save(tempJobPost)

		goodRequest(res)
	}

	async updateLastMessageID(req: Request, res: Response) {
		logger.debug(`update last message id request: ${req.url}`)
		const user = res.locals.user as User

		user.telegram.lastMessageID = req.body.message_id
		await UserTelegramRepo.save(user.telegram)

		goodRequest(res)
	}

	async updateLastCallbackMessageID(req: Request, res: Response) {
		logger.debug(`update last callback message id request: ${req.url}`)
		const user = res.locals.user as User

		user.telegram.lastCallbackMessageID = req.body.message_id
		await UserTelegramRepo.save(user.telegram)

		goodRequest(res)
	}

	async updatePhone(req: Request, res: Response) {
		logger.debug(`update phone request: ${req.url}`)
		const user = res.locals.user as User

		user.phone = req.body.phone_number
		await UserRepo.save(user)

		goodRequest(res)
	}

	async agreeTermAndCondition(req: Request, res: Response) {
		logger.debug(`agree term and condition request: ${req.url}`)
		const user = res.locals.user as User
		const { link } = req.body

		try {
			const agreementString = await httpsGetAsync(link)

			user.policy.agreementDate = new Date()
			user.policy.agreementLink = link
			user.policy.agreementSignature = uuid()
			user.policy.agreementString = agreementString

			await UserPolicyRepo.save(user.policy)

			goodRequest(res)
		} catch {
			noGoodRequest(res)
		}
	}

	async telegramStep(req: Request, res: Response) {
		logger.debug(`telegram step request: ${req.url}`)
		const user = res.locals.user as User
		const { step } = req.body

		if (step in TelegramStep) {
			user.telegram.step = step

			await UserTelegramRepo.save(user.telegram)

			goodRequest(res)
		} else {
			noGoodRequest(res)
		}
	}

	async addPersonalEmail(req: Request, res: Response) {
		logger.debug(`add personal email request: ${req.url}`)
		const user = res.locals.user as User
		const { email } = req.body

		if (!EmailValidator.validate(email)) return noGoodRequest(res, 'invalid email')
		if ((await UserRepo.findAndCountBy({ email }))[1] > 0) return noGoodRequest(res, 'email is registered')

		user.email = email
		await UserRepo.save(user)

		goodRequest(res)
	}

	async temporaryCompany(req: Request, res: Response) {
		logger.debug(`temporary company request ${req.url}`)
		const user = res.locals.user as User
		const { name, description, employeeCount, sector, country, city, email, phone, website } = req.body

		if (name) user.temporaryCompany.name = name
		if (description) user.temporaryCompany.description = description
		if (website) user.temporaryCompany.website = website

		if (phone) {
			if (/^(\+2519\d{8}|09\d{8}|\+2517\d{8}|07\d{8})$/.test(phone))
				user.temporaryCompany.phone = phone
			else return noGoodRequest(res, 'invalid phone')
		}

		if (email) {
			if (!EmailValidator.validate(email)) return noGoodRequest(res, 'invalid email')

			const theCompany = await CompanyRepo.findOne({
				where: {
					email
				}
			})
			if (theCompany) return noGoodRequest(res, 'email is registered')

			user.temporaryCompany.email = email
		}
		if (employeeCount) {
			const item = Object.entries(EmployeeCount).map(([key, value]) => ({ key, value })).find(item => `${item.key} - ${item.value}`)

			if (item)
				user.temporaryCompany.employeeCount = item.value
			else
				return noGoodRequest(res, 'no valid size found')
		}

		if (sector) {
			let theSector = await SectorRepo.findOneBy({ name: sector })
			if (!theSector) return noGoodRequest(res, 'no sector found')

			user.temporaryCompany.sector = theSector
		}

		if (country) {
			let theCountry = await CountryRepo.findOneBy({ name: country })
			if (!theCountry) return noGoodRequest(res, 'no country found')

			user.temporaryCompany.country = theCountry
		}

		if (city) {
			let theCity = await CityRepo.findOneBy({
				name: city,
				country: { id: user.temporaryCompany.country.id }
			})
			if (!theCity) return noGoodRequest(res, 'no city found')

			user.temporaryCompany.city = theCity
		}

		await TemporaryCompanyRepo.save(user.temporaryCompany)

		goodRequest(res)
	} // temporaryCompany

	async sectorList(req: Request, res: Response) {
		logger.debug(`sector list request ${req.url}`)

		goodRequest(res, ['sectors', await SectorRepo.find()])
	}

	async countryList(req: Request, res: Response) {
		logger.debug(`country list request ${req.url}`)

		goodRequest(res, ['countries', await CountryRepo.find()])
	}

	async cityList(req: Request, res: Response) {
		logger.debug(`city list request ${req.url}`)
		const user = res.locals.user as User

		const cities = await CityRepo.find({
			where: {
				country: {
					id: user.temporaryCompany.country.id
				}
			}
		})

		goodRequest(res, ['cities', cities])
	}

	async ethCityList(req: Request, res: Response) {
		logger.debug(`eth city list request ${req.url}`)
		const user = res.locals.user as User

		const cities = await CityRepo.find({
			where: {
				country: {
					name: "Ethiopia"
				}
			}
		})

		goodRequest(res, ['cities', cities])
	}

	async addTemporaryCompany(req: Request, res: Response) {
		logger.debug(`add temporary company request: ${req.url}`)
		const user = res.locals.user as User

		if (user.telegram.step !== TelegramStep.ConfirmTemporaryCompany) return noGoodRequest(res)

		const { name, description, employeeCount, sector, country, city, email, phone, website } = user.temporaryCompany

		const theCompany = new Company()
		theCompany.city = city
		theCompany.country = country
		theCompany.description = description
		theCompany.email = email
		theCompany.employeeCount = employeeCount
		theCompany.name = name
		theCompany.owner = user
		theCompany.phone = phone
		theCompany.sector = sector
		theCompany.website = website

		user.temporaryCompany = {
			id: user.temporaryCompany.id,
			owner: user.temporaryCompany.owner,
			// @ts-ignore
			name: null,
			// @ts-ignore
			description: null,
			// @ts-ignore
			employeeCount: null,
			// @ts-ignore
			sector: null,
			// @ts-ignore
			country: null,
			// @ts-ignore
			city: null,
			// @ts-ignore
			email: null,
			// @ts-ignore
			phone: null,
			// @ts-ignore
			website: null,
		}

		await CompanyRepo.save(theCompany)
		await TemporaryCompanyRepo.save(user.temporaryCompany)

		goodRequest(res)
	}

	async setEditCompanyID(req: Request, res: Response) {
		logger.debug(`set edit company id request ${req.url}`)
		const user = res.locals.user as User

		user.variable.editCompany = req.body.id

		await UserVariableRepo.save(user.variable)

		goodRequest(res)
	}

	async temporaryJobPost(req: Request, res: Response) {
		logger.debug(`temporary job post request: ${req.url}`)
		const user = res.locals.user as User
		const { city, companyId, country, description, employeeCount, salary, sector, title, type, location } = req.body

		if (title) user.temporaryJobPost.title = title
		if (description) user.temporaryJobPost.description = description
		if (type in JobType) user.temporaryJobPost.type = type

		if (companyId) {
			let theCompany = await CompanyRepo.findOneBy({ id: companyId })
			if (!theCompany) return noGoodRequest(res, 'no sector found')

			user.temporaryJobPost.companyId = theCompany.id
		}

		if (sector) {
			let theSector = await SectorRepo.findOneBy({ name: sector })
			if (!theSector) return noGoodRequest(res, 'no sector found')

			user.temporaryJobPost.sector = theSector
		}

		// if (country) {
		// 	let theCountry = await CountryRepo.findOneBy({ name: country })
		// 	if (!theCountry) return noGoodRequest(res, 'no country found')

		// 	user.temporaryJobPost.country = theCountry
		// }

		// if (city) {
		// 	let theCity = await CityRepo.findOneBy({ name: city, country: user.temporaryJobPost.country })
		// 	if (!theCity) return noGoodRequest(res, 'no city found')

		// 	user.temporaryJobPost.city = theCity
		// }

		if (location) user.temporaryJobPost.location = location

		if (employeeCount && !isNaN(employeeCount)) user.temporaryJobPost.employeeCount = employeeCount
		if (salary && !isNaN(salary)) user.temporaryJobPost.salary = salary

		await TemporaryJobPostRepo.save(user.temporaryJobPost)

		goodRequest(res)
	}

	async confirmTempJobPost(req: Request, res: Response) {
		logger.debug(`confirm temp job post request ${req.url}`)
		const user = res.locals.user as User

		if (user.telegram.step !== TelegramStep.ConfirmTempJobPost) return noGoodRequest(res)

		const company = await CompanyRepo.findOneBy({ id: user.temporaryJobPost.companyId })

		const newJobPost = new JobPost()
		newJobPost.company = company
		newJobPost.description = user.temporaryJobPost.description
		newJobPost.employeeCount = user.temporaryJobPost.employeeCount
		newJobPost.location = user.temporaryJobPost.location
		newJobPost.owner = user
		newJobPost.salary = user.temporaryJobPost.salary
		newJobPost.sector = user.temporaryJobPost.sector
		newJobPost.title = user.temporaryJobPost.title
		newJobPost.type = user.temporaryJobPost.type

		user.temporaryJobPost = {
			// @ts-ignore
			id: user.temporaryJobPost.id,
			// @ts-ignore
			companyId: null,
			// @ts-ignore
			description: null,
			// @ts-ignore
			employeeCount: null,
			// @ts-ignore
			location: null,
			// @ts-ignore
			owner: null,
			// @ts-ignore
			salary: null,
			// @ts-ignore
			sector: null,
			// @ts-ignore
			title: null,
			// @ts-ignore
			type: null,
		}

		await JobPostRepo.save(newJobPost)
		await TemporaryJobPostRepo.save(user.temporaryJobPost)

		goodRequest(res, ["jobPostId", newJobPost.id])
	}

	async jobPostSingle(req: Request, res: Response) {
		logger.debug(`job post single request ${req.url}`)
		const user = res.locals.user as User

		const jobPost = await JobPostRepo.findOne({
			where: {
				id: Number(req.query.jobPostId),
				owner: { id: user.id }
			},
			relations: ["sector", "company", "owner"]
		})

		goodRequest(res, ["jobPost", jobPost])
	}
} // telegramController


export default new telegramController()