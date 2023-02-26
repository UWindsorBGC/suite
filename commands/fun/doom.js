/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { AudioPlayerStatus } from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import { play } from '../../tools/tools.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('doom')
        .setDescription('It is all fun and games until the DOOM music kicks in.'),
    group: 'fun',
    async execute(inter) {
        if (!inter.member.voice)
            return await inter.reply({ content: 'You need to be in a voice channel', ephemeral: true });

        let url = [
            'https://youtu.be/h_uXUXQFypc?t=79',
            'https://www.youtube.com/watch?v=20HXdyo1pHc',
            'https://www.youtube.com/watch?v=zZMg9ryeWOw',
            'https://www.youtube.com/watch?v=G2z3kPJ7SvI'
        ];

        play(inter, url[Math.floor(Math.random() * url.length)], true);

        await inter.reply(`Playing **DOOM** music in **${inter.member.voice.channel.name}**. :skull:`);

        let server = inter.client.queue[inter.guild.id];

        server.player.on(AudioPlayerStatus.Idle, () => {
            if (server.loop) {
                play(inter, url[Math.floor(Math.random() * url.length)], true);
            }
        });

        server.player.on('error', (error) => {
            console.log(`${inter.guild.name}: ${error.message}`);
        });
    }
};
