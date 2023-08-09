import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";
import { TemporaryCompany } from "./temporary.company.entity";
import { Company } from "./company.entity";

@Entity()
export class Country {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => City, city => city.country)
	cities: City[];

	@OneToMany(() => TemporaryCompany, temporaryCompany => temporaryCompany.sector)
	temporaryCompanies: TemporaryCompany[];

	@OneToMany(() => Company, company => company.sector)
	companies: Company[];
}
