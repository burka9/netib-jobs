import { Application } from "express";
import { RouteConfig } from "../common/route.config";

export class TelegramRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'TelegramrRoutes')
	}

	registerRoute(): Application {
		this.app.use('/telegram', this.router)
		return this.app
	}

	configureRoutes(): void {
	}
}
