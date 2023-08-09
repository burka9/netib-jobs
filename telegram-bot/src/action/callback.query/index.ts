import { Chat, User } from "node-telegram-bot-api";
import { TelegramStep, _user } from "../../interface/api";
import { welcomeMessage } from "../../response/common/welcome.message";
import { editTextMessage, sendTextMessage } from "../../response/message/text.message";
import { sharePersoanlEmailInlineKeyboard } from "../../response/markup/inline.keyboard";
import { changeTelegramStep } from "../../response/common/telegramStep";

export const sharePersonalEmail = async (
	user: _user,
	from: Chat | User,
	edit = false
) => {
	let step = await changeTelegramStep(from.id, TelegramStep.WaitingPersonalEmail)

	if (!step) return welcomeMessage(from) // unknown telegram step

	if (edit) {
		await editTextMessage({
			chat_id: from.id,
			message_id: user.telegram.lastMessageID,
			text:
				`Send your email`,
			reply_markup: sharePersoanlEmailInlineKeyboard
		})
	} else  {
		await sendTextMessage({
			chat_id: from.id,
			text:
				`Send your email`,
			reply_markup: sharePersoanlEmailInlineKeyboard
		})
	}
}
