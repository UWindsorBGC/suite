/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the bot from playing music in the voice channel'),
    group: 'general',
    async execute(inter) {
        let server = inter.client.queue[inter.guild.id];

        if (server && inter.member.voice.channel.id == server.channel) {
            server.loop = false;
            server.queue = [];
            server.player.stop();
            return await inter.reply(`Stopped playing music in **${inter.member.voice.channel.name}**`);
        }

        await inter.reply('You are not in a voice channel!');
    }
};
