export interface _user {
	id: number;
	phone: string;
	email: string;
	telegram: _user_telegram;
	policy: _user_policy;
}

export enum TelegramStep {
  Default = "Default",
  WaitingPersonalEmail = "WaitingPersonalEmail"
}

export interface _user_telegram {
	id: number;
	chatID: string;
	username: string;
	firstName: string;
	lastName: string;
	lastMessageID: number;
	step: TelegramStep;
	user: _user;
}

export interface _user_policy {
	id: number;
	agreementString: string;
	agreementLink: string;
	agreementSignature: string;
	agreementDate: Date;
	user: _user;
}
