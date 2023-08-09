import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./admin.entity";

@Entity()
export class AdminSession {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		generated: "uuid"
	})
	token: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({
		default: 3 * 24 * 60 * 60
	})
	expiresIn: number; // in seconds

	@ManyToOne(() => Admin, admin => admin.sessions)
	admin: Admin;
}