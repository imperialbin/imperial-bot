import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions, RequiresDMContext } from "@sapphire/decorators";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { getUser } from "../../utils/getUser";
import { sendEmbed } from "../../utils/sendEmbed";

@ApplyOptions<CommandOptions>({
  description: "Link your Imperial account with your Discord account",
})
export class LinkCommand extends Command {
  @RequiresDMContext((message: Message) =>
    send(message, "Try DMing me with that command!")
  )
  public async run(message: Message) {
    const user = await getUser(message.author.id);

    if (!user) {
      const embed = sendEmbed(
        "You haven't connected yet!",
        "To connect your Imperial account with your Discord, follow the link below: https://staging-balls-api.impb.in/v1/oauth/discord",
        message,
        false
      );

      return message.channel.send({ embeds: [embed] });
    }

    if (user) {
      const embed = sendEmbed(
        `${user.username} has been linked with ${message.author.tag}`,
        "Woohoo! Your account has been linked with your imperial account.",
        message,
        false
      );

      return message.channel.send({ embeds: [embed] });
    }
  }
}
