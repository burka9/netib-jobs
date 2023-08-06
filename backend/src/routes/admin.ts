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
		
		// handle job posts
		this.router.route("/pending-job-posts")
			.get(admin.getPendingJobPosts)
	}
}