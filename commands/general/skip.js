/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder, InteractionResponse } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder().setName('skip').setDescription('Skips the current song.'),
    group: 'general',
    async execute(inter) {
        if (inter.client.queue[inter.guild.id]) {
            if (!inter.client.queue[inter.guild.id].loop) {
                inter.client.queue[inter.guild.id].player.stop();
                await inter.reply('Skipped this song.');
            }
        }
    }
};
