import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { getUser } from "../../lib/getUser";
import { sendEmbed } from "../../lib/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Delete a document",
})
export class DeleteCommand extends Command {
  public async run(message: Message) {
    const user = await getUser(message.author.id);
    const document = await prisma.document.findUnique({
      where: {
        id: message.content.substring(15),
      },
    });

    if (!document) {
      const embed = sendEmbed(
        "Invalid Document",
        "Document does not exist with that ID",
        message,
        true
      );
      return message.channel.send({ embeds: [embed] });
    }

    if (document?.creator == user?.username) {
      await prisma.document.delete({
        where: {
          id: message.content.substring(15),
        },
      });

      const embed = sendEmbed(
        "Successfully deleted Document",
        `Farewell ${document?.id}!`,
        message,
        false
      );
      return message.channel.send({ embeds: [embed] });
    } else {
      const embed = sendEmbed(
        "Failed to delete Document",
        "You do not have permissions to delete that document!",
        message,
        true
      );
      return message.channel.send({ embeds: [embed] });
    }
  }
}
