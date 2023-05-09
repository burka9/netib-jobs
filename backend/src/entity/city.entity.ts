import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { TemporaryCompany } from "./temporary.company.entity";
import { Company } from "./company.entity";

@Entity()
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@ManyToOne(() => Country, country => country.cities)
	country: Country;

	@OneToMany(() => TemporaryCompany, temporaryCompany => temporaryCompany.sector)
	temporaryCompanies: TemporaryCompany[];

	@OneToMany(() => Company, company => company.sector)
	companies: Company[];
}
