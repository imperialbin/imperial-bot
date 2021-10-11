import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions, RequiresDMContext } from "@sapphire/decorators";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { getUser } from "../../lib/getUser";
import { sendEmbed } from "../../lib/sendEmbed";
import { API_URL } from "../../lib/constants";

@ApplyOptions<CommandOptions>({
  description: "Link your Imperial account with your Discord account",
})
export class LinkCommand extends Command {
  public async run(message: Message) {
    const user = await getUser(message.author.id);

    const messageEmbed = sendEmbed(
      "Let's continue where we left off",
      "Type `imp link` below to start linking your Imperial account with your Discord acccount",
      message,
      false
    );

    if (message.channel.type !== "DM") {
      const embed = sendEmbed(
        "Sent a DM",
        `For further information on unlinking your account - check your DMs.`,
        message,
        false
      );
      message.author.send({ embeds: [messageEmbed] });
      return message.channel.send({ embeds: [embed] });
    } else {
      if (!user) {
        const embed = sendEmbed(
          "You haven't connected yet!",
          `To connect your Imperial account with your Discord, follow the link below: ${API_URL}/v1/oauth/discord`,
          message,
          false
        );
        return message.channel.send({ embeds: [embed] });
      }

      if (user) {
        const embed = sendEmbed(
          `${user.username} has been linked with ${message.author.tag}`,
          "Your Discord account has already been linked with your Imperial account.",
          message,
          false
        );

        return message.channel.send({ embeds: [embed] });
      }
    }
  }
}
