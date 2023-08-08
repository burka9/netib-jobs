import Axios from "axios"

export const axios = Axios.create({
	baseURL: "http://localhost:3000",
	// baseURL: "https://backend.netibjobs.com",
})

export interface JobPost {
	description?: string;
	employeeCount?: number;
	howToApply?: string;
	id?: number;
	location?: string;
	moderated?: boolean;
	sector: {
		id: number;
		name: string;
	},
	salary?: number;
	title?: string;
	type?: string;
}