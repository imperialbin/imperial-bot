import { Command, config } from "@mammot/core";
import { CommandInteraction } from "discord.js";
import ms from "pretty-ms";
import { sendEmbed } from "../../lib/sendEmbed";

@config("ping", { description: "Get the Bot & API pings" })
export class PingCommand extends Command {
  public async run(interaction: CommandInteraction) {
    const embed = sendEmbed(
      "Pong!  🏓 ",
      ms(Date.now() - interaction.createdTimestamp),
      interaction,
      false
    );

    return interaction.reply({ embeds: [embed] });
  }
}
