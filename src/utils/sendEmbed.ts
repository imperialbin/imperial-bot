import { MessageEmbed, EmbedFieldData } from "discord.js";

export const sendEmbed = (
  title: string,
  description: string,
  error: boolean,
  fields?: EmbedFieldData[]
) => {
  if (fields) {
    return new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .addFields(fields)
      .setColor("#24292e");
  }

  if (error) {
    return new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor("#ff4f4f");
  } else {
    return new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor("#24292e");
  }
};
