import { createServer } from "http"
import express, { Router } from "express"
import "express-async-errors"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import logger from "./common/logger"
import { ENVIRONMENT, SERVER  } from "./common/env"
import { errorHandler, getUserInfo } from "./common/middleware"
import { initializeBot } from "./telegram"
import adminRoute from "./admin.route"


const app = express()
const router = Router()
const adminRouter = Router()

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

app.use('/admin', adminRouter)
app.use(errorHandler)
app.use(getUserInfo)
app.use('/', router)


const SERVER_CALLBACK = () => {
	logger.debug(`ENVIRONMENT: ${ENVIRONMENT}`)
	logger.info(`server started `)
	logger.debug(`listening on ${SERVER.HOST}:${SERVER.PORT}`)

	initializeBot(router)
	adminRoute(adminRouter)
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