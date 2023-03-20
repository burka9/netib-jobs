import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import morgan from 'morgan'
import cors from 'cors'
import { SERVER } from './common/env'
import logger from './common/logger'
import { RouteConfig } from './common/route.config'
import { errorHandler } from './middleware'
import { Database } from './database'
import { TelegramRoutes } from './routes/telegram'

const routes: Array<RouteConfig> = []


// express configuration
const app = express()
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


// routes configuration
routes.push(new TelegramRoutes(app))
app.use(errorHandler)



// database configuration
Database.initialize()
	.then(() => {
		logger.info('database connected')
	})
	.catch(err => {
		logger.error(err.toString())
		logger.error('database connection failed')
	})





// server configuration
const SERVER_CALLBACK = () => {
	logger.info(`server started `)
	logger.debug(`listening on ${SERVER.HOST}:${SERVER.PORT}`)

	routes.forEach(route => logger.info(`Route configured: ${route.name}`))
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