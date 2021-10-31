import {Command, config} from '@mammot/core';
import type {CommandInteraction} from 'discord.js';
import {sendEmbed} from '../../lib/sendEmbed';

@config('help', {description: 'A list of all the commands for the bot'})
export class HelpCommand extends Command {
	public run(interaction: CommandInteraction) {
		const embed = sendEmbed('Commands', 'All the commands inside IMPERIAL', interaction, false, [
			{
				name: '/link',
				value: 'Link your Imperial account with your Discord account',
			},
			{
				name: '/unlink',
				value: 'Unlink your Imperial account with your Discord account',
			},
			{
				name: '/new {content}',
				value: 'Create a new document',
			},
			{
				name: '/get {id}',
				value: "Get a document's content",
			},
			{
				name: '/delete {id}',
				value: 'Delete a document',
			},
			{
				name: '/help',
				value: 'List of all commands for the bot',
			},
			{
				name: '/ping',
				value: 'Get bot latency',
			},
		]);

		return interaction.reply({ephemeral: true, embeds: [embed]});
	}
}
