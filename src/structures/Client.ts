import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { Intents } from "discord.js";

declare module "@sapphire/framework" {
  interface SapphireClient {
    db: PrismaClient;
    owners: string[];

    captureExecption: (err: Error) => string;
  }
}

export class Client extends SapphireClient {
  public readonly db = new PrismaClient();
  public readonly owners = ["207204046115831809", "822545100118818827"];

  public constructor(options?: SapphireClientOptions) {
    super({
      ...options,
      defaultPrefix: process.env.DEV_MODE ? "imp dev" : "imp",
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      ],
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
      presence: {
        activities: [
          {
            name: "imperialb.in",
            type: "PLAYING",
          },
        ],
        status: "online",
      },
      allowedMentions: {
        repliedUser: false,
        parse: ["roles", "users"],
      },
      http: {
        version: 8,
      },
    });
  }

  public async login() {
    const token = process.env.DISCORD_BOT_TOKEN;
    await this.db.$connect();

    return super.login(token);
  }
}
