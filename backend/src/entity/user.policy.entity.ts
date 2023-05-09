import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserPolicy {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: true })
	agreementString: string;

	@Column({ nullable: true })
	agreementLink: string;

	@Column({ nullable: true, unique: true })
	agreementSignature: string;

	@Column({ nullable: true })
	agreementDate: Date;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;
}