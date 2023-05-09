import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserVariable {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true})
	editCompany: number;

	@Column({ nullable: true })
	deleteCompany: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;
}