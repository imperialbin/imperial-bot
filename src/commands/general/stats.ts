import { CommandOptions } from "@sapphire/framework";
import { ImperialCommand } from "../../structures/Command";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { sendEmbed } from "../../lib/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Get statistics about the bot",
})
export class StatsCommand extends ImperialCommand {
  public async run(message: Message) {
    const embed = sendEmbed(
      "Bot Statistics",
      `Below are stats on the Imperial Bot`,
      message,
      false,
      [
        {
          name: "Guilds",
          value: `${this.container.client.guilds.cache.size}`,
          inline: true,
        },
        {
          name: "Users",
          value: `${this.container.client.users.cache.size}`,
          inline: true,
        },
      ]
    );

    return message.channel.send({ embeds: [embed] });
  }
}
