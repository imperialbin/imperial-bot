import "@sapphire/plugin-logger/register";
import "@skyra/editable-commands";
import "reflect-metadata";
import "dotenv/config";
import { Client } from "./structures/Client";

const client = new Client();

client.login();
client.logger.info(`Logging in...`);
