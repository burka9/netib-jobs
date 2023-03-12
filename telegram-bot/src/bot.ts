import axios from "axios";
import { Router } from "express";
import { DEVELOPMENT, WEBHOOK } from "./env";
import fetch from "./fetch";
import logger from "./logger";

let webhook: string

async function setWebhookURL() {
	logger.debug('setting up webhook')
	let origin: string
	
	if (DEVELOPMENT) {
		origin = (await axios.get('http://127.0.0.1:4040/api/tunnels')).data.tunnels[0].public_url
	} else {
		origin = WEBHOOK.ORIGIN
	}

	webhook = origin.concat(WEBHOOK.HREF)

	try {
		let result = await fetch('setWebhook', 'POST', { url: webhook })
		logger.debug(result.data.description)
	} catch(err: any) {
		logger.info('failed to set webhook')
		logger.error(err.toString())
		return
	}

	logger.debug(`webhook url: ${webhook}`)
}

// async function getWebhookURL() {
// }


export async function initializeBot(router: Router) {
	logger.debug('initalizing bot')
	
	await setWebhookURL()
	// await getWebhookURL()

	// await incoming requests
	router.post(WEBHOOK.HREF, (req, res) => {
		logger.debug(`incoming requeset`)
		console.log(req.body)
		res.end()
	})

	logger.info('webhook is set and waiting for incoming connections')
}
