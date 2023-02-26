/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export const command = {
    data: new SlashCommandBuilder()
        .setName('silence')
        .setDescription('Silents everybody, use again to unsilence.')
        .addUserOption((option) =>
            option.setName('except').setDescription('Silence everybody except this person and the DM.')
        ),
    group: 'dnd',
    async execute(inter) {
        if (!inter.member.roles.cache.some((role) => role.id === config.DM)) {
            return await inter.reply({ content: 'Only a dungeon master can use this command.', ephemeral: true });
        }

        let except = inter.options.getMember('except') || null;

        let msg = 'Party has been silenced';

        if (except) {
            msg = `Party has been silenced except for ${except.mention}`;
        }

        inter.member.voice.channel.members.forEach((member) => {
            if ((except && member.id !== except.id) || member.id !== inter.member.id) {
                if (!member.voice.serverMute) {
                    member.voice.setMute(true);
                } else {
                    member.voice.setMute(false);
                    msg = 'Party has been unsilenced.';
                }
            }
        });

        await inter.reply(msg);
    }
};
