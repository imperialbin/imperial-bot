import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { codeBlock } from "@sapphire/utilities";
import { sendEmbed } from "../../lib/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Recieve a document's content",
})
export class GetCommand extends Command {
  public async run(message: Message) {
    const document = await prisma.document.findUnique({
      where: {
        id: message.content.substring(8),
      },
    });

    if (document) {
      const documentSettings = await prisma.documentSettings.findUnique({
        where: {
          id: document?.documentSettingsId,
        },
      });

      message.channel.send(
        codeBlock(String(documentSettings?.language), document?.content)
      );
    } else {
      const embed = sendEmbed(
        "Invalid ID",
        "Could not find document with that ID!",
        message,
        true
      );
      return message.channel.send({ embeds: [embed] });
    }
  }
}
