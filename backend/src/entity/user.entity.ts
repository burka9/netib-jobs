import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserTelegram } from "./user.telegram.entity";
import { UserPolicy } from "./user.policy.entity";
import { Company } from "./company.entity";
import { TemporaryCompany } from "./temporary.company.entity";
import { UserVariable } from "./user.variable.entity";
import { TemporaryJobPost } from "./temporary.job.post.entity";
import { JobPost } from "./job.post.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true, unique: true })
	email: string;

	@OneToOne(() => UserTelegram)
	@JoinColumn()
	telegram: UserTelegram;

	@OneToOne(() => UserPolicy)
	@JoinColumn()
	policy: UserPolicy;

	@OneToMany(() => Company, company => company.owner)
	companies: Company[];

	@OneToMany(() => JobPost, jobPost => jobPost.owner)
	jobPosts: JobPost[];

	@OneToOne(() => TemporaryCompany)
	@JoinColumn()
	temporaryCompany: TemporaryCompany;

	@OneToOne(() => TemporaryJobPost)
	@JoinColumn()
	temporaryJobPost: TemporaryJobPost;

	@OneToOne(() => UserVariable)
	@JoinColumn()
	variable: UserVariable;
}