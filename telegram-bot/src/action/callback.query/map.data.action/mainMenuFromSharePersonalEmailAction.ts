import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import message from "../../../controller/message";
import { TelegramStep, _user } from "../../../interface/api";
import { viewJobsInlineKeyboard } from "../../../response/markup/inline.keyboard";
import { editTextMessage } from "../../../response/message/text.message";
import { changeTelegramStep } from "../../../response/common/telegramStep";
import { editWelcomeMessage } from "../../../response/common/welcome.message";

export default async (
	user: _user,
	from: User,
	callback_query: CallbackQuery,
	message: Message,
	update_id?: number
) => {
	await editWelcomeMessage(from as User, user.telegram.lastMessageID)
}
