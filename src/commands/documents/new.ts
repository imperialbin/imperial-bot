import { Args, Command, CommandOptions } from "@sapphire/framework";
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
export class NewCommand extends Command {
  public async run(message: Message, args: Args) {
    const user = await getUser(message.author.id);
    const lang = (await args.pickResult('string')).value;
    const code = parseCodeBlock(await args.rest('string')).code;

    try {
      const document = await prisma.document.create({
        data: {
          id: generateID(4),
          content: code,
          creator: user?.username,
          expirationDate: new Date(),
          settings: {
            create: {
              language: lang ? lang : "plaintext"
            },
          },
        },
      });
      const embed = sendEmbed(
        "Successfully created Document",
        `${BASE_URL}/${document?.id}`,
        message,
        false
      );
      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      message.channel.send(`Error occured: ${e}`);
    }
  }
}
