/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export const command = {
    data: new SlashCommandBuilder().setName('leave').setDescription('Leaves the current voice channel'),
    group: 'general',
    async execute(inter) {
        const vc = inter.member.voice.channel;
        const connection = getVoiceConnection(vc.guild.id);
        if (connection) {
            delete inter.client.queue[inter.guild.id];
            connection.destroy();
            await inter.reply(`I left ${vc.name}.`);
        } else {
            await inter.reply('I am not currently in a voice channel');
        }
    }
};
