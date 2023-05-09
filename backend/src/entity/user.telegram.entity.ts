import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

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

  PostJob = "PostJob",
  TempJobTitle = "TempJobTitle",
  TempJobDescription = "TempJobDescription",
  TempJobType = "TempJobType",
  TempJobSector = "TempJobSector",
  TempJobSalary = "TempJobSalary",
  TempJobCountry = "TempJobCountry",
  TempJobCity = "TempJobCity",
  TempJobLocation = "TempJobLocation",
  TempJobEmployeeCount = "TempJobEmployeeCount",
  ViewTempJobPost = "ViewTempJobPost",
  ConfirmTempJobPost = "ConfirmTempJobPost",
}

@Entity()
export class UserTelegram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chatID: string;

  @Column({ unique: true, nullable: true })
  username: string;
  
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  lastMessageID: number;

  @Column({ nullable: true })
  lastCallbackMessageID: number;

  @Column({
    type: "enum",
    enum: TelegramStep,
    default: TelegramStep.Default
  })
  step: TelegramStep;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}