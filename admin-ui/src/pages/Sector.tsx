import { useEffect, useState } from "react"
import { AxiosInstance } from "axios"

export type Sector = {
	id: number;
	name: string;
	editing?: boolean;
	deleting?: boolean;
	editName?: string;
}

const Sector = ({ axios }: { axios: AxiosInstance }) => {
	const [sectors, setSectors] = useState<Sector[]>([])
	const [sectorName, setSectorName] = useState("")

	useEffect(() => {
		axios.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${localStorage.getItem("netib_jobs_admin_access_token")}`

			return config
		})

		axios.get("/admin/sector")
			.then(response => {
				if (response.data.success) {
					setSectors(response.data.sectors)
				}
			})
			.catch(err => console.error(err))
	}, [])

	const addSector = () => {
		if (sectorName.trim() === "") return

		axios.post("/admin/sector", { name: sectorName.trim() })
			.then(response => {
				if (response.data.success) {
					setSectors([...sectors, { id: response.data.id, name: sectorName }])
					setSectorName("")
				}
			})
			.catch(err => console.error(err))
	}

	const updateSector = (sector: Sector) => {
		if (!sector.editName) return
		if (sector.editName.trim() === "") return

		axios.put("/admin/sector", { id: sector.id, name: sector.editName.trim() })
			.then(response => {
				if (response.data.success) {
					setSectors(sectors.map(s => s.id === sector.id ? { ...s, name: sector.editName as string, editing: false } : s))
				}
			})
			.catch(err => console.error(err))
	}

	const deleteSector = (sector: Sector) => {
		axios.delete("/admin/sector", { data: { id: sector.id } })
			.then(response => {
				if (response.data.success) {
					setSectors(sectors.filter(s => s.id !== sector.id))
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<div className="sector flex flex-col items-center m-8">
			<h4>Sectors</h4>
			<br />
			<div className="flex mb-12">
				<input type="text" placeholder="Sector Name..." value={sectorName} onChange={e => setSectorName(e.target.value)} onKeyDown={e => e.key === "Enter" ? addSector() : true} />
				<button onClick={addSector}>Add Sector</button>
			</div>

			<table>
				<thead>
					<tr>
						<th className="min-w-[175px] text-left">Sector Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{sectors.map((sector, index) => (
						<tr key={index}>
							<td className="min-w-[175px]">
								{
									sector.editing
										? <input type="text" value={sector.editName} autoFocus onChange={e => setSectors(sectors.map(s => s.id === sector.id ? { ...s, editName: e.target.value } : s))} onKeyDown={e => e.key === "Enter" ? updateSector(sector) : true} />
										: sector.name
								}
							</td>
							<td>
								{
									sector.editing
										? (
											<>
												<button className="text-sm p-0.5 px-2.5 bg-blue-600" onClick={() => updateSector(sector)}>Save</button>
												<button className="text-sm p-0.5 px-2.5 bg-gray-600" onClick={() => setSectors(sectors.map(s => s.id === sector.id ? { ...s, editing: false } : s))}>Cancel</button>
											</>
										)
										: sector.deleting
											? (
												<>
													<button className="text-sm p-0.5 px-2.5 bg-red-600" onClick={() => deleteSector(sector)}>Yes</button>
													<button className="text-sm p-0.5 px-2.5 bg-blue-600" onClick={() => setSectors(sectors.map(s => s.id === sector.id ? { ...s, deleting: false } : s))}>No</button>
												</>
											)
											: (
												<>
													<button className="text-sm p-0.5 px-2.5 bg-green-600" onClick={() => setSectors(sectors.map(s => s.id === sector.id ? { ...s, editing: true, editName: sector.name } : s))}>Edit</button>
													<button className="text-sm p-0.5 px-2.5 bg-red-600" onClick={() => setSectors(sectors.map(s => s.id === sector.id ? { ...s, deleting: true } : s))}>Delete</button>
												</>
											)
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Sector