import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { sendEmbed } from "../../lib/sendEmbed";
import { API_URL } from "../../lib/constants";

@ApplyOptions<CommandOptions>({
  description: "Unlink your Imperial account with your Discord account",
})
export class UnlinkCommand extends Command {
  public async run(message: Message) {
    const user = await prisma.user.findUnique({
      where: {
        discordId: message.author.id,
      },
    });

    const unlinkAccount = async () => {
      if (user) {
        await prisma.user.update({
          where: {
            discordId: message.author.id,
          },
          data: {
            discordId: null,
          },
        });

        const embed = sendEmbed(
          `Unlinked ${message.author.tag}`,
          "Your discord account has been unlinked with your Imperial account",
          message,
          false
        );

        return message.author.send({ embeds: [embed] });
      }
    };

    const notConnectedEmbed = sendEmbed(
      "You haven't connected yet!",
      `To connect your Imperial account with your Discord, follow the link below: ${API_URL}/v1/oauth/discord`,
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

      if (user) {
        unlinkAccount();
      } else {
        message.author.send({ embeds: [notConnectedEmbed] });
      }
      return message.channel.send({ embeds: [embed] });
    } else {
      if (!user) {
        return message.channel.send({ embeds: [notConnectedEmbed] });
      }

      if (user) {
        unlinkAccount();
      }
    }
  }
}
