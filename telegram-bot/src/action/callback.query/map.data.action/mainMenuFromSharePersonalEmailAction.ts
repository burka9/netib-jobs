import { User, CallbackQuery, Message } from "node-telegram-bot-api";
import { _user } from "../../../interface/api";
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
