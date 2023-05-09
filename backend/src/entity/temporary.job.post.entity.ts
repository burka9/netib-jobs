import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sector } from "./sector.entity";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { User } from "./user.entity";

export enum JobType {
	FullTime = "FullTime",
	Remote = "Remote"
}

@Entity()
export class TemporaryJobPost {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	companyId: number;

	@Column({ nullable: true })
	title: string;

	@Column({ nullable: true, type: "text" })
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

	@Column({ nullable: true })
	location: string;

	@Column({ nullable: true })
	employeeCount: number;

	@OneToOne(() => User)
	@JoinColumn()
	owner: User;
}