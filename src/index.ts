import {Mammot} from '@mammot/core';
import {Intents} from 'discord.js';
import {green} from 'colorette';
import {
	LinkAccount,
	UnlinkAccount,
	HelpCommand,
	PingCommand,
	NewDocument,
	GetDocument,
	DeleteDocument,
} from './commands';

const mammot = Mammot.client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],

	developmentGuild: process.env.DEVELOPMENT_GUILD_ID!,

	async onError(interaction, error) {
		console.warn(error);
		return Promise.resolve('Something went wrong!');
	},

	onReady(user) {
		console.log(green('ready -'), `Logged into client as ${user.username}`);
	},
});

mammot
	.addCommands([
		LinkAccount,
		UnlinkAccount,
		HelpCommand,
		PingCommand,
		NewDocument,
		GetDocument,
		DeleteDocument,
	])
	.login(process.env.DISCORD_BOT_TOKEN);
