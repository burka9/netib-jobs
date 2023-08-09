import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TelegramGroupType {
	SuperGroup = "supergroup",
	Channel = "channel",
}

export enum TelegramGroupStatus {
	Administrator = "administrator",
	Member = "Member"
}

@Entity()
export class TelegramGroup {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	chatID: string;

	@Column({ unique: true, nullable: true })
	username: string;

	@Column()
	title: string;

	@Column({
		type: "enum",
		enum: TelegramGroupType,
	})
	type: TelegramGroupType;

	@Column({
		type: "enum",
		enum: TelegramGroupStatus
	})
	status: TelegramGroupStatus;
}

