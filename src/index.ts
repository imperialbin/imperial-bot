import "@sapphire/plugin-logger/register";
import "@skyra/editable-commands";
import "reflect-metadata";
import "dotenv/config";
import { Client } from "./structures/Client";
import { BASE_URL } from "./lib/constants";
import { prisma } from "./prisma";
import { sendEmbed } from "./lib/sendEmbed";
import { codeBlock } from "@sapphire/utilities";

const client = new Client();

client.on("messageCreate", async (message) => {
  if (message.content.includes(`${BASE_URL}/`)) {
    const path = message.content.replace(/^https?:\/\//, "").split("/");
    const document = await prisma.document.findUnique({
      where: {
        id: path[1],
      },
    });

    if (document) {
      const documentSettings = await prisma.documentSettings.findUnique({
        where: {
          id: document?.documentSettingsId,
        },
      });
      const embed = sendEmbed(
        "Imperial URL detected!",
        codeBlock(String(documentSettings?.language), document?.content),
        message,
        false
      );

      message.channel.send({ embeds: [embed] });
    }
  }
});

client.login();
client.logger.info(`Logging in...`);
