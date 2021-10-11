import { CommandOptions } from "@sapphire/framework";
import { ImperialCommand } from "../../structures/Command";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import ms from "pretty-ms";
import { sendEmbed } from "../../lib/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Get the Bot & API pings",
})
export class PingCommand extends ImperialCommand {
  public async run(message: Message) {
    const embed = sendEmbed(
      "Pong!  🏓 ",
      ms(this.container.client.ws.ping),
      message,
      false
    );

    return message.channel.send({ embeds: [embed] });
  }
}
