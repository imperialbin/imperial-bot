import { MessageEmbed, EmbedFieldData } from "discord.js";

export const sendEmbed = (
  title: string,
  description: string,
  fields?: EmbedFieldData[]
) => {
  let embed = new MessageEmbed().setTitle(title).setDescription(description);

  if (fields) {
    embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .addFields(fields);
  }

  return embed;
};
