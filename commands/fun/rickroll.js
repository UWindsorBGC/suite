/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';
import { play } from '../../tools/tools.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('rickroll')
        .setDescription('Plays Never Gonna Give You Up by Rick Astley in the voice channel.'),
    group: 'fun',
    async execute(inter) {
        if (!inter.member.voice.channelId) {
            return await inter.reply({ content: 'You need to be in a voice channel', ephemeral: true });
        }

        let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        play(inter, url, false);
        await inter.reply({
            content: `Playing Never Gonna Give You Up in **${inter.member.voice.channel.name}**. :microphone:`,
            ephemeral: true
        });

        let server = inter.client.queue[inter.guild.id];

        server.player.on('error', (error) => {
            console.log(`${inter.guild.name}: ${error.message}`);
        });
    }
};
