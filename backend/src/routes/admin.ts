import { Application } from "express";
import { RouteConfig } from "../common/route.config";
import admin, { checkSession } from "../controller/admin";

export class AdminRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, "Admin Routes")
	}

	registerRoute(): Application {
		this.app.use("/admin", this.router)

		return this.app
	}

	configureRoutes(): void {
		// handle session
		this.router.route("/login")
			.post(admin.login)

		this.router.route("/verify")
			.get(checkSession, admin.verfiy)

		this.router.route("/logout")
			.get(admin.logout)

		// handle sectors
		this.router.route("/sector")
			.get(checkSession, admin.getSectors)
			.post(checkSession, admin.addSector)
			.put(checkSession, admin.updateSector)
			.delete(checkSession, admin.deleteSector)

		// handle country list
		this.router.route("/country")
			.get(checkSession, admin.getCountry)
			.post(checkSession, admin.addCountry)
			.put(checkSession, admin.updateCountry)
			.delete(checkSession, admin.deleteCountry)


		// handle city list
		this.router.route("/city")
			.get(checkSession, admin.getCity)
			.post(checkSession, admin.addCity)
			.put(checkSession, admin.updateCity)
			.delete(checkSession, admin.deleteCity)

		// handle job posts
		this.router.route("/pending-job-posts")
			.get(checkSession, admin.getPendingJobPosts)
		
		this.router.route("/accept-job-post")
			.post(checkSession, admin.acceptJobPost)

		this.router.route("/decline-job-post")
			.post(checkSession, admin.declineJobPost)
	}
}