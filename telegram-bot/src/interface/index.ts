import { ForceReply, InlineKeyboardMarkup, MessageEntity, ParseMode, ReplyKeyboardMarkup, ReplyKeyboardRemove, SendMessageOptions } from "node-telegram-bot-api";

export interface CustomSendMessageOptions {
	chat_id: string | number;
	message_thread_id?: number;
	text: string;
	parse_mode?: ParseMode;
	entities?: MessageEntity[];
	disable_web_page_preview?: boolean;
	disable_notification?: boolean;
	protect_content?: boolean;
	reply_to_message_id?: number;
	allow_sending_without_reply?: boolean;
	reply_markup?: ReplyKeyboardMarkup | InlineKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface CustomEditMessageOptions {
	chat_id?: string | number;
	message_id?: number;
	inline_message_id?: string;
	text: string;
	parse_mode?: ParseMode;
	entities?: MessageEntity[];
	disable_web_page_preview?: boolean;
	reply_markup?: InlineKeyboardMarkup;
}

export interface CustomDeleteMessageOptions {
	chat_id: number | string;
	message_id: number;
}
