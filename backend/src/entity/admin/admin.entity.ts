import { compareSync, hashSync } from "bcrypt";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SALT_ROUNDS } from "../../common/env";
import { AdminSession } from "./admin.session.entity";

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	public setPassword(password: string) {
		this.password = hashSync(password, SALT_ROUNDS)
	}

	public comparePassword(password: string): boolean {
		return compareSync(password, this.password)
	}

	@OneToMany(() => AdminSession, session => session.admin)
	sessions: AdminSession[];
}