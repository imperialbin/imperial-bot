import { Command, config } from "@mammot/core";
import type { CommandInteraction } from "discord.js";
import { sendEmbed } from "../../lib/sendEmbed";

@config("help", {description: "A list of all the commands for the bot"})
export class HelpCommand extends Command {
  public run(interaction: CommandInteraction) {
    const embed = sendEmbed(
      "Commands",
      "All the commands inside IMPERIAL",
      interaction,
      false,
      [
        {
          name: "imp link",
          value: "Link your Imperial account with your Discord account",
        },
        {
          name: "imp unlink",
          value: "Unlink your Imperial account with your Discord account",
        },
        {
          name: "imp new {text}",
          value: "Create a new document",
        },
        {
          name: "imp get {documentId}",
          value: "Get a document's content",
        },
        {
          name: "imp delete {documentId}",
          value: "Delete a document",
        },
      ]
    );

    return interaction.reply({ embeds: [embed] });
  }
}
