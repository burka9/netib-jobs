export interface _user {
	id: number;
	phone: string;
	email: string;
	telegram: _user_telegram;
	policy: _user_policy;
	companies: _company[];
	temporaryCompany: _temporaryCompany;
}

export enum TelegramStep {
  Default = "Default",
  WaitingPersonalEmail = "WaitingPersonalEmail",

  AddCompany = "AddCompany",
  CompanyName = "CompanyName",
  CompanyDescription = "CompanyDescription",
  EmployeeCount = "EmployeeCount",
  Sector = "Sector",
  Country = "Country",
  City = "City",
  CompanyPhone = "CompanyPhone",
  CompanyEmail = "CompanyEmail",
  CompanyWebsite = "CompanyWebsite",
  ViewTemporaryCompany = "ViewTemporaryCompany",
  ConfirmTemporaryCompany = "ConfirmTemporaryCompany",

  EditCompany = "EditCompany",
  EditCompanyName = "EditCompanyName",
  EditCompanyDescription = "EditCompanyDescription",
  EditCompanyEmployeeCount = "EditCompanyEmployeeCount",
  EditCompanySector = "EditCompanySector",
  EditCompanyLocation = "EditCompanyLocation",
  EditCompanyPhone = "EditCompanyPhone",
  EditCompanyEmail = "EditCompanyEmail",
  EditCompanyWebsite = "EditCompanyWebsite",
}

export interface _user_telegram {
	id: number;
	chatID: string;
	username: string;
	firstName: string;
	lastName: string;
	lastMessageID: number;
	lastCallbackMessageID: number;
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

export enum EmployeeCount {
	Tiny = "0 - 10",
	Small = "50 - 100",
	Medium = "100 - 500",
	Large = "500+"
}

export interface _company {
	id: number;
	name: string;
	description: string;
	employeeCount: EmployeeCount;
	sector: _sector;
	country: _country;
	city: _city;
	email: string;
	phone: string;
	website: string;
	owner: _user;
}

export interface _temporaryCompany {
	id: number;
	name: string;
	description: string;
	employeeCount: EmployeeCount;
	country: _country;
	city: _city;
	email: string;
	phone: string;
	website: string;
	owner: _user;
	sector: _sector;
}

export interface _sector {
	id: number;
	name: string;
}

export interface _country {
	id: number;
	name: string;
}

export interface _city {
	id: number;
	name: string;
	country: _country;
	temporaryCompanies: _temporaryCompany[];
}
