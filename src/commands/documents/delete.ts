import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { MessageEmbed } from "discord.js";
import { getUser } from "../../utils/getUser";

@ApplyOptions<CommandOptions>({
  description: "Delete a document",
})
export class DeleteCommand extends Command {
  public async run(message: Message) {
    const user = await getUser(message.author.id);
    const document = await prisma.document.findUnique({
      where: {
        id: message.content.substring(11),
      },
    });

    if (!document) {
      message.channel.send("Document does not exist with that ID");
    }

    if (document) {
      if (document?.creator == user?.username) {
        await prisma.document.delete({
          where: {
            id: message.content.substring(11),
          },
        });

        message.channel.send(`Successfully deleted ${document?.id}`);
      } else {
        message.channel.send(
          "You do not have permissions to delete that document!"
        );
      }
    }
  }
}
