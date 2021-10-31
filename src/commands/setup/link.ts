import {Command, config, option} from '@mammot/core';
import {CommandInteraction, GuildMember} from 'discord.js';
import {getUser} from '../../lib/getUser';
import {sendEmbed} from '../../lib/sendEmbed';
import {prisma} from '../../prisma';
import bcrypt from 'bcrypt';

@config('link', {
	description: 'Link your Imperial account with your Discord account',
})
export class LinkAccount extends Command {
	public async run(
		interaction: CommandInteraction,

		@option('email', {
			description: 'Email of your Imperial account',
			type: 'STRING',
		})
		email: string,

		@option('password', {
			description: 'Password of your Imperial account',
			type: 'STRING',
		})
		password: string,
	) {
		const user = await getUser((interaction.member as GuildMember).id);

		const connectedEmbed = (user: string, text: string) =>
			sendEmbed(
				`${user} has been linked with ${interaction.user.tag}`,
				`Your Discord account has ${text} been linked with your Imperial account.`,
				interaction,
				false,
			);

		const errorEmbed = sendEmbed(
			'Failed to link account',
			'Your Imperial account credentials are incorrect.',
			interaction,
			true,
		);

		if (user) {
			return interaction.reply({
				ephemeral: true,
				embeds: [connectedEmbed(user.username, 'already')],
			});
		} else {
			const account = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (account) {
				if (bcrypt.compareSync(password, account.password)) {
					await prisma.user.update({
						where: {
							id: account.id,
						},
						data: {
							discordId: (interaction.member as GuildMember).id,
						},
					});

					return interaction.reply({
						ephemeral: true,
						embeds: [connectedEmbed(account.username, 'successfully')],
					});
				} else {
					return interaction.reply({
						ephemeral: true,
						embeds: [errorEmbed],
					});
				}
			} else {
				return interaction.reply({ephemeral: true, embeds: [errorEmbed]});
			}
		}
	}
}
