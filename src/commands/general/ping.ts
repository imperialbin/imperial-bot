import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import ms from "pretty-ms";
import { sendEmbed } from "../../lib/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Get the Bot & API pings",
})
export class PingCommand extends Command {
  public async run(message: Message) {
    const embed = sendEmbed(
      "Pong!  🏓 ",
      "Below are the latencies recieved",
      message,
      false,
      [
        {
          name: "Bot Latency",
          value: ms(this.container.client.ws.ping),
        },
        {
          name: "API Latency",
          value: String(message.createdTimestamp - message.createdTimestamp),
        },
      ]
    );

    return message.channel.send({ embeds: [embed] });
  }
}
