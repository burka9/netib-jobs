import { useEffect, useState } from "react"
import { AxiosInstance } from "axios"

type MyProp = {
	axios: AxiosInstance;
}

export type Country = {
	id: number;
	name: string;
}

export type City = {
	id: number;
	name: string;
	country: Country | number;
}

const Country = ({ axios }: MyProp) => {
	const [countries, setCountries] = useState<Country[]>([])
	const [countryName, setCountryName] = useState("")
	const [cityName, setCityName] = useState("")
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
	const [cities, setCities] = useState<City[]>([])

	useEffect(() => {
		axios.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${localStorage.getItem("netib_jobs_admin_access_token")}`

			return config
		})

		axios.get("/admin/country")
			.then(response => {
				if (response.data.success) {
					setCountries(response.data.countries)
				}
			})
			.catch(err => console.error(err))
	}, [])

	useEffect(() => {
		if (selectedCountry !== null) {
			axios.get(`/admin/city?countryId=${selectedCountry.id}`)
				.then(response => {
					if (response.data.success) {
						setCities(response.data.cities)
					}
				})
				.catch(err => console.error(err))
		}
	}, [selectedCountry])
	
	const addCountry = () => {
		if (countryName.trim() === "") return

		axios.post("/admin/country", { name: countryName.trim() })
			.then(response => {
				if (response.data.success) {
					setCountries([...countries, { id: response.data.id, name: countryName }])
					setCountryName("")
				}
			})
			.catch(err => console.error(err))
	}

	const addCity = () => {
		if (cityName.trim() === "" || selectedCountry === null) return

		axios.post("/admin/city", { name: cityName.trim(), countryId: selectedCountry.id })
			.then(response => {
				if (response.data.success) {
					setCities([...cities, { id: response.data.id, name: cityName, country: selectedCountry.id }])
					setCityName("")
				}
			})
	}

	const deleteCountry = (country: Country) => {
		axios.delete(`/admin/country`, { data: { id: country.id } })
			.then(response => {
				if (response.data.success) {
					setCountries(countries.filter(c => c.id !== country.id))
					setSelectedCountry(null)
				}
			})
			.catch(err => console.error(err))
	}

	const deleteCity = (city: City) => {
		axios.delete(`/admin/city`, { data: { id: city.id } })
			.then(response => {
				if (response.data.success) {
					setCities(cities.filter(c => c.id !== city.id))
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<div className="grid grid-cols-2 m-8">
			<div className="country flex flex-col">
				<h4>Countries</h4>
				<br />
				<div className="flex mb-12">
					<input type="text" className="ml-0" placeholder="Country Name..." value={countryName} onChange={e => setCountryName(e.target.value)} onKeyDown={e => e.key === "Enter" ? addCountry() : true} />
					<button onClick={addCountry}>Add Country</button>
				</div>

				{countries.map((country, index) => (
					<div key={index} className="flex justify-between items-center w-[400px] cursor-pointer hover:bg-gray-300 p-0 px-3" style={{
						// backgroundColor: countries.find(c => c.id === selectedCountry?.id) ? "gray" : "transparent",
						// color: countries.find(c => c.id === selectedCountry?.id) ? "white" : "gray",
					}} onClick={() => {
						setSelectedCountry(country)
					}}>
						<p className="font-bold">{country.name}</p>
						<div className="actions">
							<button className="text-sm p-0.5 px-3 border-0 bg-red-600" onClick={() => deleteCountry(country)}>Delete</button>
						</div>
					</div>
				))}
			</div>

			<div className="city flex flex-col my-12 pl-12 border-l-1 border-gray-800">
				{
					selectedCountry === null ? <></> : (
						<div className="flex flex-col">
							<h6>City List For {selectedCountry.name}</h6>
							<div className="flex mb-12">
								<input type="text" className="ml-0 text-sm" placeholder="City Name..." value={cityName} onChange={e => setCityName(e.target.value)} onKeyDown={e => e.key === "Enter" ? addCity() : true} />
								<button onClick={addCity} className="text-sm">Add City</button>
							</div>
							<br />

							{cities.map((city, index) => (
								<div key={index} className="flex justify-between">
									<p>{city.name}</p>
									<button className="text-sm bg-red-500" onClick={() => deleteCity(city)}>Delete</button>
								</div>
							))}
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Country