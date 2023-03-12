import { createServer } from "http"
import express, { Router } from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import logger from "./logger"
import { ENVIRONMENT, SERVER } from "./env"
import { errorHandler } from "./middleware"
import { initializeBot } from "./bot"


const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())
app.use(morgan('combined', {
	stream: {
		write: (message: string) => {
			logger.info(message.trim());
		},
	}
}))

app.use(errorHandler)
app.use('/', router)


const SERVER_CALLBACK = () => {
	logger.debug(`ENVIRONMENT: ${ENVIRONMENT}`)
	logger.info(`server started `)
	logger.debug(`listening on ${SERVER.HOST}:${SERVER.PORT}`)

	initializeBot(router)
}

const server = createServer(app)
server
	.listen(SERVER.PORT, SERVER.HOST, SERVER_CALLBACK)
	.on('error', (err: any) => {
		if (err.code === 'EADDRINUSE') {
			logger.info('Address in use, retrying...')
			setTimeout(() => {
				server.close()
				SERVER.PORT++
				server.listen(SERVER.PORT, SERVER.HOST)
			}, 1000)
		}
	})