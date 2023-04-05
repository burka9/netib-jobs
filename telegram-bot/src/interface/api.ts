export interface _user {
	id: number;
	phone: string;
	telegram: _user_telegram;
}

export interface _user_telegram {
	id: number;
	chatID: string;
	username: string;
	firstName: string;
	lastName: string;
	lastMessageID: number;
	user: _user;
}
