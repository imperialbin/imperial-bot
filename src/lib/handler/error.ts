import {CommandInteraction} from 'discord.js';
import {sendEmbed} from '../sendEmbed';
import {MESSAGE_ERROR_MAP, MessageErrors} from '../../types/errors';

export const error = (interaction: CommandInteraction, message_error: string) => {
	const errorMessage = MESSAGE_ERROR_MAP[message_error as MessageErrors];
	return sendEmbed(errorMessage.title, errorMessage.description, interaction, true);
};
