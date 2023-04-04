import { MessageEntity, ParseMode, ReplyKeyboardMarkup, SendMessageOptions } from "node-telegram-bot-api";

export interface CustomSendMessageOptions extends SendMessageOptions {
	chat_id: number | string;
	message_thread_id?: number;
	text: string;
	parse_mode?: ParseMode;
	entities?: MessageEntity[];
	disable_web_page_preview?: boolean;
	disable_notification?: boolean;
	protect_content?: boolean;
	reply_to_message_id?: number;
	allow_sending_without_reply?: boolean;
	reply_markup?: ReplyKeyboardMarkup
}