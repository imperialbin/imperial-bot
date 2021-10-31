import {config, Command, option} from '@mammot/core';
import {CommandInteraction} from 'discord.js';
import {prisma} from '../../prisma';
import {error} from '../../lib/handler/error';
import {BASE_URL} from '../../lib/constants';
import {sendEmbed} from '../../lib/sendEmbed';
import {codeBlock} from '@discordjs/builders';
import Url from 'url-parse';

@config('get', {description: 'Read a document'})
export class GetDocument extends Command {
	public async run(
		interaction: CommandInteraction,

		@option('id', {
			description: 'ID of document to read',
			type: 'STRING',
			required: true,
		})
		id: string,
	) {
		if (!id) {
			const embed = error(interaction, 'no_id_provided');
			return interaction.reply({ephemeral: true, embeds: [embed]});
		} else {
			const document = await prisma.document.findUnique({
				where: {
					id: id.includes(BASE_URL) ? new Url(id).pathname.replace('/', '') : id,
				},
			});

			if (document) {
				const documentSettings = await prisma.documentSettings.findUnique({
					where: {
						id: document?.documentSettingsId,
					},
				});

				interaction.reply(codeBlock(String(documentSettings?.language), document?.content));
			} else {
				const embed = sendEmbed(
					'Invalid ID',
					'Could not find document with that ID!',
					interaction,
					true,
				);
				return interaction.reply({ephemeral: true, embeds: [embed]});
			}
		}
	}
}
