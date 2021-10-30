import { MessageEmbed, EmbedFieldData } from "discord.js";
import { CommandInteraction } from "discord.js";

export const sendEmbed = (
  title: string,
  description: string,
  interaction: CommandInteraction,
  error: boolean,
  fields?: EmbedFieldData[]
) => {
  let embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor("#24292e")
    .setAuthor(
      interaction.user.tag,
      interaction.user.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setTimestamp()
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
