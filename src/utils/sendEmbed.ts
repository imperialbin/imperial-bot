import { MessageEmbed, EmbedFieldData } from "discord.js";
import type { Message } from "discord.js";

export const sendEmbed = (
  title: string,
  description: string,
  message: Message,
  error: boolean,
  fields?: EmbedFieldData[]
) => {
  let embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor("#24292e")
    .setAuthor(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setFooter(
      "IMPERIAL",
      "https://imperialb.in/assets/favicon/favicon-96x96.png"
    );

  if (fields) {
    return embed.addFields(fields);
  }

  if (error) {
    return embed.setColor("#ff4f4f");
  }

  return embed;
};
