import { config, Command, option } from "@mammot/core";
import { CommandInteraction, GuildMember } from "discord.js";
import { prisma } from "../../prisma";
import { getUser } from "../../lib/getUser";
import { sendEmbed } from "../../lib/sendEmbed";

@config("delete", { description: "Delete a document" })
export class DeleteDocument extends Command {
  public async run(
    interaction: CommandInteraction,

    @option("id", {
      description: "ID of document to delete",
      type: "STRING",
      required: true,
    })
    id: string
  ) {
    const user = await getUser((interaction.member as GuildMember).id);
    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      const embed = sendEmbed(
        "Invalid Document",
        "Document does not exist with that ID",
        interaction,
        true
      );
      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    if (document?.creator == user?.username) {
      await prisma.document.delete({
        where: {
          id,
        },
      });

      const embed = sendEmbed(
        "Successfully deleted Document",
        `Farewell ${document?.id}!`,
        interaction,
        false
      );
      return interaction.reply({ ephemeral: true, embeds: [embed] });
    } else {
      const embed = sendEmbed(
        "Failed to delete Document",
        "You do not have permissions to delete that document!",
        interaction,
        true
      );
      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
}
