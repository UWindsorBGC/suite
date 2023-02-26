/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export const command = {
    data: new SlashCommandBuilder()
        .setName('whisper')
        .setDescription('Allows the Dungeon Master to whisper something to somebody.')
        .addUserOption((option) => option.setName('target').setDescription('The person the DM is whispering to.')),
    group: 'dnd',
    async execute(inter) {
        if (!inter.member.roles.cache.some((role) => role.id === config.DM)) {
            return await inter.reply({ content: 'Only a dungeon master can use this command.', ephemeral: true });
        }

        const user = inter.options.getMember('target');

        const tavern = '984198043630960681';
        const whispers = '1066514832800624640';

        if (!user) {
            inter.member.voice.channel.members.map((m) => {
                m.voice.setChannel(tavern);
            });
            await inter.reply({ content: 'Moved you back to the tavern channel', ephemeral: true });
        } else {
            inter.member.voice.setChannel(whispers);
            user.voice.setChannel(whispers);
            await inter.reply({ content: 'Moved you to the whispers channel.', ephemeral: true });
        }
    }
};
