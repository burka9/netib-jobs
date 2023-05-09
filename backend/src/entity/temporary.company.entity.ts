import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Sector } from "./sector.entity";
import { Country } from "./country.entity";
import { City } from "./city.entity";

enum EmployeeCount {
	Tiny = "0 - 10",
	Small = "50 - 100",
	Medium = "100 - 500",
	Large = "500+"
}

@Entity()
export class TemporaryCompany {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	name: string;

	@Column({ type: "text", nullable: true })
	description: string;

	@Column({
		type: "enum",
		enum: EmployeeCount,
		nullable: true
	})
	employeeCount: EmployeeCount;

	@ManyToOne(() => Country, country => country.temporaryCompanies)
	country: Country;

	@ManyToOne(() => City, city => city.temporaryCompanies)
	city: City;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	website: string;

	@ManyToOne(() => Sector, sector => sector.temporaryCompanies)
	sector: Sector;
	
	@OneToOne(() => User)
	@JoinColumn()
	owner: User;
}