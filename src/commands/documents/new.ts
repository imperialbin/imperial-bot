import { config, Command, option } from "@mammot/core";
import { CommandInteraction, GuildMember } from "discord.js";
import { prisma } from "../../prisma";
import { getUser } from "../../lib/getUser";
import { generateID } from "../../lib/generate";
import { parseCodeBlock } from "../../lib/parseCodeBlock";
import { sendEmbed } from "../../lib/sendEmbed";
import { BASE_URL } from "../../lib/constants";

@config("new", { description: "Create a new document" })
export class NewDocument extends Command {
  public async run(
    interaction: CommandInteraction,

    @option("content", {
      description: "Text content to upload",
      type: "STRING",
      required: true,
    })
    content: string
  ) {
    const user = await getUser((interaction.member as GuildMember).id);
    const code = parseCodeBlock(content);

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

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          documentsMade: user.documentsMade++,
        },
      });

      const embed = sendEmbed(
        "Successfully created Document",
        `${BASE_URL}/${document?.id}`,
        interaction,
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

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    } else {
      const embed = sendEmbed(
        "Failed to create Document",
        "Uh oh. An error occured, re-check your message.",
        interaction,
        true
      );

      return interaction.reply({ embeds: [embed] });
    }
  }
}
