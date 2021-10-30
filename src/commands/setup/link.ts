import { Command, config } from "@mammot/core";
import { CommandInteraction, GuildMember } from "discord.js";
import { getUser } from "../../lib/getUser";
import { sendEmbed } from "../../lib/sendEmbed";
import { API_URL } from "../../lib/constants";

@config("link", {
  description: "Link your Imperial account with your Discord account",
})
export class LinkAccount extends Command {
  public async run(interaction: CommandInteraction) {
    const user = await getUser((interaction.member as GuildMember).id);

    const messageEmbed = sendEmbed(
      "Let's continue where we left off",
      "Type `imp link` below to start linking your Imperial account with your Discord acccount",
      interaction,
      false
    );

    const linkAccount = () => {
      const embed = sendEmbed(
        `${user.username} has been linked with ${interaction.user.tag}`,
        "Your Discord account has already been linked with your Imperial account.",
        interaction,
        false
      );

      return interaction.user.send({ embeds: [embed] });
    };

    if (interaction.channel?.type !== undefined) {
      const embed = sendEmbed(
        "Sent a DM",
        `For further information on linking your account - check your DMs.`,
        interaction,
        false
      );

      if (user) {
        linkAccount();
        interaction.reply({ embeds: [embed] });
      } else {
        interaction.user.send({ embeds: [messageEmbed] });
        return interaction.reply({ embeds: [embed] });
      }
    } else {
      if (!user) {
        const embed = sendEmbed(
          "You haven't connected yet!",
          `To connect your Imperial account with your Discord, follow the link below: ${API_URL}/v1/oauth/discord`,
          interaction,
          false
        );
        return interaction.reply({ embeds: [embed] });
      }

      if (user) {
        const embed = sendEmbed(
          `${user.username} has been linked with ${interaction.user.tag}`,
          "Your Discord account has already been linked with your Imperial account.",
          interaction,
          false
        );

        return interaction.reply({ embeds: [embed] });
      }
    }
  }
}
