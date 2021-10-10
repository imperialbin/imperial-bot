import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions, RequiresDMContext } from "@sapphire/decorators";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { sendEmbed } from "../../utils/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Unlink your Imperial account with your Discord account",
})
export class UnlinkCommand extends Command {
  @RequiresDMContext((message: Message) =>
    send(message, "Try DMing me with that command!")
  )
  public async run(message: Message) {
    const user = await prisma.user.findUnique({
      where: {
        discordId: message.author.id,
      },
    });

    if (!user) {
      const embed = sendEmbed(
        "You haven't connected yet!",
        "To connect your Imperial account with your Discord, follow the link below: https://staging-balls-api.impb.in/v1/oauth/discord",
        false
      );

      return message.channel.send({ embeds: [embed] });
    }

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
        false
      );

      return message.channel.send({ embeds: [embed] });
    }
  }
}
