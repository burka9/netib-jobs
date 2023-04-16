import axios from "axios";
import { Router } from "express";
import { DEVELOPMENT, TUNNEL, WEBHOOK } from "./common/env";
import logger from "./common/logger";
import controller from "./controller";
import response from "./response";
import tunnel from "./common/tunnel";

let webhook: string

async function setWebhookURL() {
	logger.debug('setting up webhook')
	let origin: string

	if (DEVELOPMENT) {
		origin = await tunnel[TUNNEL]()
	} else {
		origin = WEBHOOK.ORIGIN
	}

	webhook = origin.concat(WEBHOOK.HREF)

	let result = await response('setWebhook', 'POST', { url: webhook })
	logger.debug(result.data.description)

	logger.debug(`webhook url: ${webhook}`)
}


export async function initializeBot(router: Router) {
	logger.debug('initalizing bot')

	try {
		await setWebhookURL()
	} catch(err: any) {
		logger.info('failed to set webhook')
		logger.error(err.toString())
		return
	}

	// await incoming requests
	router.post(WEBHOOK.HREF, async (req, res) => {
		logger.debug(`incoming requeset`)
		
		if (res.locals.user) {
			await controller(res.locals.user, req.body)
		}

		res.end()
	})

	logger.info('webhook is set and waiting for incoming connections')
}
