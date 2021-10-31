import {Command, config} from '@mammot/core';
import {CommandInteraction, GuildMember} from 'discord.js';
import {prisma} from '../../prisma';
import {sendEmbed} from '../../lib/sendEmbed';
import {getUser} from '../../lib/getUser';

@config('unlink', {
	description: 'Unlink your Imperial account with your Discord account',
})
export class UnlinkAccount extends Command {
	public async run(interaction: CommandInteraction) {
		const user = await getUser((interaction.member as GuildMember).id);

		if (user) {
			await prisma.user.update({
				where: {
					discordId: (interaction.member as GuildMember).id,
				},
				data: {
					discordId: null,
				},
			});

			const embed = sendEmbed(
				`Unlinked ${interaction.user.tag}`,
				'Your discord account has been unlinked with your Imperial account',
				interaction,
				false,
			);

			return interaction.reply({ephemeral: true, embeds: [embed]});
		} else {
			const embed = sendEmbed(
				`You haven't linked your account!`,
				'To link your account, run `/link`',
				interaction,
				false,
			);

			return interaction.reply({ephemeral: true, embeds: [embed]});
		}
	}
}
