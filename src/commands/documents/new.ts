import { Args, Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { prisma } from "../../prisma";
import { getUser } from "../../utils/getUser";
import { generateID } from "../../utils/generate";
import { codeBlock } from "@sapphire/utilities";

@ApplyOptions<CommandOptions>({
  description: "Create a new document",
})
export class NewCommand extends Command {
  public async run(message: Message) {
    const user = await getUser(message.author.id);

    try {
      const document = await prisma.document.create({
        data: {
          id: generateID(4),
          content: message.content.substring(9),
          creator: user?.username,
          expirationDate: new Date(),
          settings: {
            create: {},
          },
        },
      });
      message.channel.send(`Successfully created document! https://staging-balls.impb.in/${document?.id}`);
    } catch (e) {
      message.channel.send(`Error occured: ${e}`);
    }
  }
}
