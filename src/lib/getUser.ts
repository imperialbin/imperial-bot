import {prisma} from '../prisma';
import {User} from '@prisma/client';

export const getUser = async (id: string) => {
	return (await prisma.user.findUnique({
		where: {
			discordId: id,
		},
	})) as User;
};
