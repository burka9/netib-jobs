import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { Sector } from "./sector.entity";
import { JobPost } from "./job.post.entity";

export enum EmployeeCount {
	Tiny = "0 - 10",
	Small = "50 - 100",
	Medium = "100 - 500",
	Large = "500+"
}

@Entity()
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: "text" })
	description: string;

	@Column({
		type: "enum",
		enum: EmployeeCount
	})
	employeeCount: EmployeeCount;

	@ManyToOne(() => Sector, sector => sector.companies)
	sector: Sector;

	@ManyToOne(() => Country, country => country.companies)
	country: Country;

	@ManyToOne(() => City, city => city.companies)
	city: City;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	website: string;

	@OneToMany(() => JobPost, jobPost => jobPost.company)
	jobPosts?: JobPost[];

	@ManyToOne(() => User, user => user.companies)
	owner: User;
}
