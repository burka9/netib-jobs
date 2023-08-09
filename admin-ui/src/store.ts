import Axios from "axios"
import { Sector } from "./pages/Sector";
import { City, Country } from "./pages/Country";

export const axios = Axios.create({
	// baseURL: "http://localhost:3000",
	baseURL: "https://backend.netibjobs.com",
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
	company?: Company;
	owner?: User;
}

export interface Company {
	id?: number;
	name?: string;
	description?: string;
	employeeCount?: string;
	sector?: Sector;
	country?: Country;
	city?: City;
	email?: string;
	phone?: string;
	website?: string;
	jobPosts?: JobPost[];
	owner?: User;
}

export interface User {
	id?: number;
	phone?: string;
	email?: string;
	telegram?: UserTelegram;
	// policy?: UserPolicy;
	companies?: Company[];
	jobPosts?: JobPost[];
	// temporaryCompany?: TemporaryCompany;
	// temporaryJobPost?: TemporaryJobPost;
	// variable?: UserVariable;
}

export interface UserTelegram {
	id?: number;
	chatID?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	lastMessageID?: number;
	lastCallbackMessageID?: number;
	// step?: TelegramStep;
	user?: User;
}