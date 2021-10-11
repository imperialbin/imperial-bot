import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { sendEmbed } from "../../utils/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "A list of all the commands for the bot",
})
export class HelpCommand extends Command {
  public run(message: Message) {
    const embed = sendEmbed(
      "Commands",
      "All the commands inside IMPERIAL",
      message,
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

    return message.reply({ embeds: [embed] });
  }
}
