import type { Message } from "discord.js";
import { sendEmbed } from "../sendEmbed";
import { MESSAGE_ERROR_MAP, MessageErrors } from "../../types/errors";

export const error = (message: Message, message_error: string) => {
  const errorMessage = MESSAGE_ERROR_MAP[message_error as MessageErrors];
    return sendEmbed(
      errorMessage.title,
      errorMessage.description,
      message,
      true
     );
}