import { NextFunction, Request, Response } from "express";
import { Database } from "../database";
import { Admin } from "../entity/admin/admin.entity";
import { AdminSession } from "../entity/admin/admin.session.entity";
import { badRequest, goodRequest } from "../common/response";
import jwt from "jsonwebtoken";
import { KEY } from "../common/env";
import { JobPost } from "../entity/job.post.entity";
import { Sector } from "../entity/sector.entity";

export const adminRepo = Database.getRepository(Admin)
export const sessionRepo = Database.getRepository(AdminSession)
export const jobPostRepo = Database.getRepository(JobPost)
export const sectorRepo = Database.getRepository(Sector)

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
				// issuer: "https://netibjobs.com/",
				// audience: "https://backend.netibjobs.com",
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
				where: { moderated: false },
				relations: ["sector"]
			})
		])
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
}


export default new AdminController()