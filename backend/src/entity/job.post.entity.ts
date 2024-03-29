import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sector } from "./sector.entity";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { User } from "./user.entity";
import { Company, EmployeeCount } from "./company.entity";

export enum JobType {
	FullTime = "FullTime",
	PartTime = "PartTime",
	Contract = "Contract",
	Internship = "Internship",
	Temporary = "Temporary",
	Remote = "Remote"
}

@Entity()
export class JobPost {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ type: "text" })
	description: string;

	@Column({
		type: "enum",
		enum: JobType,
		nullable: true
	})
	type: JobType;

	@ManyToOne(() => Sector, sector => sector.temporaryJobPosts)
	sector: Sector;

	@Column({ nullable: true })
	salary: number;

	@Column()
	location: string;

	@Column({ nullable: true })
	employeeCount: number;

	@Column("text", { nullable: true })
	howToApply: string;

	@ManyToOne(() => Company, company => company.jobPosts)
	company?: Company | null;

	@Column("bool", {
		default: false
	})
	accepted: boolean;

	@Column("bool", {
		default: false
	})
	declined: boolean;

	@Column({ nullable: true })
	messageId: string;

	@Column({ nullable: true })
	chatId: string;

	@Column({ nullable: true })
	postDate: Date;

	// @Column()
	// companyName: string;

	// @Column({ type: "text" })
	// companyDescription: string;

	// @Column({
	// 	type: "enum",
	// 	enum: EmployeeCount
	// })
	// companyEmployeeCount: EmployeeCount;

	// @ManyToOne(() => Sector, sector => sector.companies)
	// companySector: Sector;

	// @ManyToOne(() => Country, country => country.companies)
	// companyCountry: Country;

	// @ManyToOne(() => City, city => city.companies)
	// companyCity: City;

	// @Column({ nullable: true })
	// companyEmail: string;

	// @Column({ nullable: true })
	// companyPhone: string;

	// @Column({ nullable: true })
	// companyWebsite: string;

	@ManyToOne(() => User, user => user.jobPosts)
	owner: User;
}