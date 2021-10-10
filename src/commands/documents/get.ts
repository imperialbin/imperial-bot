import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { MessageEmbed } from "discord.js";
import { codeBlock } from '@sapphire/utilities';

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

    const documentSettings = await prisma.documentSettings.findUnique({
        where: {
            id: document?.documentSettingsId
        }
    })

    console.log(documentSettings?.language)

    message.channel.send(codeBlock(String(documentSettings?.language), document?.content))
  }
}
