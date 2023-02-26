/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Sets the current volume of the music playing.')
        .addNumberOption((option) =>
            option
                .setName('percent')
                .setDescription('How much % you want the volume to be.')
                .setMaxValue(100)
                .setRequired(true)
        ),
    group: 'general',
    async execute(inter) {
        let server = inter.client.queue;
        if (server[inter.guild.id]) {
            server = inter.client.queue[inter.guild.id];
            const percent = inter.options.getNumber('percent');
            server.volume = percent / 100;
            server.source.volume.setVolume(server.volume);
            return await inter.reply(`Changed the volume to **${percent}%**.`);
        }

        return await inter.reply('There is no active player at the moment!');
    }
};
