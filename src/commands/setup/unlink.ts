import {Command, config} from '@mammot/core';
import {CommandInteraction, GuildMember} from 'discord.js';
import {prisma} from '../../prisma';
import {sendEmbed} from '../../lib/sendEmbed';
import {API_URL} from '../../lib/constants';

@config('unlink', {
	description: 'Unlink your Imperial account with your Discord account',
})
export class UnlinkAccount extends Command {
	public async run(interaction: CommandInteraction) {
		const user = await prisma.user.findUnique({
			where: {
				discordId: (interaction.member as GuildMember).id,
			},
		});

		const unlinkAccount = async () => {
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

				return interaction.user.send({embeds: [embed]});
			}
		};

		const notConnectedEmbed = sendEmbed(
			"You haven't connected yet!",
			`To connect your Imperial account with your Discord, follow the link below: ${API_URL}/v1/oauth/discord`,
			interaction,
			false,
		);

		if (interaction.channel?.type !== undefined) {
			const embed = sendEmbed(
				'Sent a DM',
				`For further information on unlinking your account - check your DMs.`,
				interaction,
				false,
			);

			if (user) {
				unlinkAccount();
			} else {
				interaction.user.send({embeds: [notConnectedEmbed]});
			}
			return interaction.reply({embeds: [embed]});
		} else {
			if (!user) {
				return interaction.reply({embeds: [notConnectedEmbed]});
			}

			if (user) {
				unlinkAccount();
			}
		}
	}
}
