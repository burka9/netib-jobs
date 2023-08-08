import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { Database } from "../database";
import { Admin } from "../entity/admin/admin.entity";
import { AdminSession } from "../entity/admin/admin.session.entity";
import { badRequest, goodRequest } from "../common/response";
import jwt from "jsonwebtoken";
import { KEY, TELEGRAM } from "../common/env";
import { JobPost } from "../entity/job.post.entity";
import { Sector } from "../entity/sector.entity";
import { Country } from "../entity/country.entity";
import { City } from "../entity/city.entity";

export const adminRepo = Database.getRepository(Admin)
export const sessionRepo = Database.getRepository(AdminSession)
export const jobPostRepo = Database.getRepository(JobPost)
export const sectorRepo = Database.getRepository(Sector)
export const countryRepo = Database.getRepository(Country)
export const cityRepo = Database.getRepository(City)

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
	const [bearer, access_token] = (req.headers.authorization as string).split(" ")

	try {
		const t = jwt.verify(access_token, KEY.PUBLIC, {
			issuer: "https://netibjobs.com/",
			audience: "https://backend.netibjobs.com",
			algorithms: ["RS256"],
		}) as any

		const session = await sessionRepo.findOneBy({
			id: t.id
		})

		if (!session) throw new Error

		next()
	} catch (err: any) {
		console.log(err)
		badRequest(res, "invalid access token", 401)
	}
}

class AdminController {
	async login(req: Request, res: Response) {
		const { username, password } = req.body

		if (!username || !password) throw new Error("bad request")

		const admin = await adminRepo.findOneBy({ username })
		if (!admin) throw new Error("incorrect credentials")
		if (!admin.comparePassword(password)) throw new Error("incorrect credentials")

		const session = new AdminSession()
		session.admin = admin

		await sessionRepo.save(session)

		const options: jwt.SignOptions = {
			issuer: "https://netibjobs.com/",
			audience: "https://backend.netibjobs.com",
			expiresIn: "3 days",
			algorithm: "RS256"
		}

		const access_token = jwt.sign({
			username: session.admin.username,
			token: session.token,
			id: session.id,
			created: session.createdAt
		}, KEY.PRIVATE, options)

		goodRequest(res, ["access_token", access_token])
	}

	async logout(req: Request, res: Response) {
		const [bearer, access_token] = (req.headers.authorization as string).split(" ")

		try {
			const t = jwt.verify(access_token, KEY.PUBLIC, {
				issuer: "https://netibjobs.com/",
				audience: "https://backend.netibjobs.com",
				algorithms: ["RS256"],
			}) as any

			const session = await sessionRepo.findOneBy({
				id: t.id
			})

			if (!session) throw new Error

			await sessionRepo.remove(session)

			goodRequest(res)
		} catch (err: any) {
			console.log(err)
			badRequest(res, "invalid access token")
		}
	}

	async verfiy(req: Request, res: Response) {
		goodRequest(res)
	}

	async getPendingJobPosts(req: Request, res: Response) {
		goodRequest(res, [
			"jobPosts",
			await jobPostRepo.find({
				where: { accepted: false, declined: false },
				relations: ["sector"]
			})
		])
	}

	async acceptJobPost(req: Request, res: Response) {
		const { id } = req.body

		if (isNaN(Number(id))) throw new Error("bad request")

		const jobPost = await jobPostRepo.findOne({
			where: { id },
			relations: ["owner", "owner.telegram"]
		})
		if (!jobPost) throw new Error("job post not found")

		const chatID = jobPost.owner.telegram.chatID
		const jobPostResponse = await axios.post(`${TELEGRAM.HANDLER_URL}/admin/post-job-to-group`, { chatID, jobPostId: jobPost.id })

		if (jobPostResponse.data.success) {
			jobPost.accepted = true
			jobPost.chatId = jobPostResponse.data.chatId
			jobPost.messageId = jobPostResponse.data.messageId
			jobPost.postDate = jobPostResponse.data.postDate
			
			await jobPostRepo.save(jobPost)
		}

		goodRequest(res)
	}

	async declineJobPost(req: Request, res: Response) {
		const { id } = req.body

		if (isNaN(Number(id))) throw new Error("bad request")

		const jobPost = await jobPostRepo.findOneBy({ id })
		if (!jobPost) throw new Error("job post not found")

		jobPost.declined = true
		
		await jobPostRepo.save(jobPost)

		goodRequest(res)
	}

	async getSectors(req: Request, res: Response) {
		const sectorId = req.query.sectorId as string

		const filter: any = {}
		if (sectorId) filter.id = sectorId

		const sectors = await sectorRepo.findBy(filter)

		goodRequest(res, ["sectors", sectors])
	}

	async addSector(req: Request, res: Response) {
		const { name } = req.body

		if (!name) throw new Error("bad request")

		const sector = new Sector()
		sector.name = name

		await sectorRepo.save(sector)

		goodRequest(res)
	}

	async updateSector(req: Request, res: Response) {
		const { id, name } = req.body

		if (!id || !name) throw new Error("bad request")

		const sector = await sectorRepo.findOneBy({ id })
		if (!sector) throw new Error("sector not found")

		sector.name = name

		await sectorRepo.save(sector)

		goodRequest(res)
	}

	async deleteSector(req: Request, res: Response) {
		const { id } = req.body

		if (!id) throw new Error("bad request")

		const sector = await sectorRepo.findOneBy({ id })
		if (!sector) throw new Error("sector not found")

		await sectorRepo.remove(sector)

		goodRequest(res)
	}

	async getCountry(req: Request, res: Response) {
		const countryId = req.query.countryId as string

		const filter: any = {}
		if (countryId) filter.id = countryId

		const countries = await countryRepo.findBy(filter)

		goodRequest(res, ["countries", countries])
	}

	async addCountry(req: Request, res: Response) {
		const { name } = req.body

		if (!name) throw new Error("bad request")

		const country = new Country()
		country.name = name

		await countryRepo.save(country)

		goodRequest(res)
	}

	async updateCountry(req: Request, res: Response) {
		const { id, name } = req.body

		if (!id || !name) throw new Error("bad request")

		const country = await sectorRepo.findOneBy({ id })
		if (!country) throw new Error("country not found")

		country.name = name

		await countryRepo.save(country)

		goodRequest(res)
	}

	async deleteCountry(req: Request, res: Response) {
		const { id } = req.body

		if (!id) throw new Error("bad request")

		const country = await countryRepo.findOneBy({ id })
		if (!country) throw new Error("country not found")

		await countryRepo.remove(country)

		goodRequest(res)
	}

	async getCity(req: Request, res: Response) {
		const cityId = req.query.cityId as string
		const countryId = req.query.countryId as string

		const filter: any = {}
		if (cityId) filter.id = cityId
		if (countryId) filter.country = { id: countryId }

		const cities = await cityRepo.findBy(filter)

		goodRequest(res, ["cities", cities])
	}

	async addCity(req: Request, res: Response) {
		const { name, countryId } = req.body

		if (!name) throw new Error("bad request")

		const country = await countryRepo.findOneBy({ id: countryId })
		if (!country) throw new Error("no country found")

		const city = new City()
		city.name = name
		city.country = country

		await cityRepo.save(city)

		goodRequest(res)
	}

	async updateCity(req: Request, res: Response) {
		const { id, name, countryId } = req.body

		if (!id || !name) throw new Error("bad request")

		const country = await countryRepo.findOneBy({ id: countryId })
		if (!country) throw new Error("no country found")

		const city = await cityRepo.findOneBy({ id })
		if (!city) throw new Error("city not found")

		city.name = name
		city.country = country

		await cityRepo.save(city)

		goodRequest(res)
	}

	async deleteCity(req: Request, res: Response) {
		const { id } = req.body

		if (!id) throw new Error("bad request")

		const city = await cityRepo.findOneBy({ id })
		if (!city) throw new Error("city not found")

		await cityRepo.remove(city)

		goodRequest(res)
	}
}


export default new AdminController()