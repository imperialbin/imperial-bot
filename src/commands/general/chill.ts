import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import ms from "pretty-ms";
import { sendEmbed } from "../../utils/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Get the Bot & API pings",
})
export class ChillCommand extends Command {
  public async run(message: Message) {
    return message.channel.send("hey Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.    ");
  }
}
