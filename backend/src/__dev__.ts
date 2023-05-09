import { InsertResult } from "typeorm"
import logger from "./common/logger"
import { Database } from "./database"
import { Country } from "./entity/country.entity"
import { Sector } from "./entity/sector.entity"
import { City } from "./entity/city.entity"

export default async () => {
	logger.debug(`dev file run start`)

	// add sectors
	Database
		.createQueryBuilder()
		.insert()
		.into(Sector)
		.values([
			{ name: "Sector 1" },
			{ name: "Sector 2" },
			{ name: "Sector 3" },
			{ name: "Sector 4" },
		])
		.execute()
		.then(() => logger.debug('sectors created'))
		.catch(err => logger.debug(`failed to create sectors: ${err.message}`))

	// add countries
	Database
		.createQueryBuilder()
		.insert()
		.into(Country)
		.values([
			{ name: 'Ethiopia' }
		])
		.execute()
		.then(result => {
			logger.debug(`countries created`)
			result.identifiers.forEach(id => {
				Database
					.createQueryBuilder()
					.insert()
					.into(City)
					.values([
						{ name: 'Addis Ababa', country: id.id },
						{ name: 'Adama', country: id.id },
						{ name: 'Hawasa', country: id.id },
					])
					.execute()
					.then(() => logger.debug(`cities created for country ${id.id}`))
					.catch(err => logger.debug(`failed to create cities`))
			})
		})
		.catch(err => logger.debug(`failed to create countries`))


	logger.debug(`dev file run end`)
}