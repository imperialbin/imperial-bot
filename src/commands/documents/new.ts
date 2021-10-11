import { Args, CommandOptions } from "@sapphire/framework";
import { ImperialCommand } from "../../structures/Command";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { getUser } from "../../lib/getUser";
import { generateID } from "../../lib/generate";
import { parseCodeBlock } from "../../lib/parseCodeBlock";
import { sendEmbed } from "../../lib/sendEmbed";
import { BASE_URL } from "../../lib/constants";

@ApplyOptions<CommandOptions>({
  description: "Create a new document",
})
export class NewCommand extends ImperialCommand {
  public async run(message: Message, args: Args) {
    const user = await getUser(message.author.id);
    const code = parseCodeBlock(await args.rest("string"));

    const document = await prisma.document.create({
      data: {
        id: generateID(4),
        content: code.code,
        creator: user?.username,
        expirationDate: new Date(),
        settings: {
          create: {
            language: code.lang ? code.lang : "plaintext",
          },
        },
      },
    });

    if (document) {
      const documentSettings = await prisma.documentSettings.findUnique({
        where: {
          id: document?.documentSettingsId,
        },
      });

      const embed = sendEmbed(
        "Successfully created Document",
        `${BASE_URL}/${document?.id}`,
        message,
        false,
        [
          {
            name: "ID",
            value: `${document?.id}`,
            inline: true,
          },
          {
            name: "Language",
            value: `${documentSettings?.language}`,
            inline: true,
          },
        ]
      );

      return message.channel.send({ embeds: [embed] });
    } else {
      const embed = sendEmbed(
        "Failed to create Document",
        "Uh oh. An error occured, re-check your message.",
        message,
        true
      );

      return message.channel.send({ embeds: [embed] });
    }
  }
}
