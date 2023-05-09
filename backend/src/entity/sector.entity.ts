import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemporaryCompany } from "./temporary.company.entity";
import { Company } from "./company.entity";
import { TemporaryJobPost } from "./temporary.job.post.entity";

@Entity()
export class Sector {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => TemporaryCompany, temporaryCompany => temporaryCompany.sector)
	temporaryCompanies: TemporaryCompany[];

	@OneToMany(() => Company, company => company.sector)
	companies: Company[];

	@OneToMany(() => TemporaryJobPost, temporaryJobPost => temporaryJobPost.sector)
	temporaryJobPosts: TemporaryJobPost[];
}
