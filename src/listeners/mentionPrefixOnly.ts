import { Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { sendEmbed } from "../lib/sendEmbed";

export class MentionEvent extends Listener<"mentionPrefixOnly"> {
  public async run(message: Message) {
    const prefix = this.container.client.options.defaultPrefix;
    const embed = sendEmbed(
      "Prefix",
      prefix
        ? `My prefix in this guild is: \`${prefix}\``
        : "You do not need a prefix in DMs.",
      message,
      false
    );
    return message.reply({ embeds: [embed] });
  }
}
