/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { AudioPlayerStatus } from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import { play, getTheme } from '../../tools/tools.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('upperplanes')
        .setDescription('Plays upper planes themed music for campaigns, default command plays ambient music.')
        .addStringOption((sub) =>
            sub.setName('theme').setDescription('Plays other themes.').addChoices({ name: 'battle', value: 'battle' })
        ),
    group: 'dnd',
    async execute(inter) {
        if (!inter.member.voice.channelId) {
            return await inter.reply({ content: 'You need to be in a voice channel', ephemeral: true });
        }

        const theme = inter.options.getString('theme') || 'ambience';

        play(inter, await getTheme(inter, theme, 'upperplanes'), true);

        await inter.reply(`Playing upper planes ${theme} in **${inter.member.voice.channel.name}**. :dizzy:`);

        let server = inter.client.queue[inter.guild.id];

        server.player.on(AudioPlayerStatus.Idle, async () => {
            if (server.loop) {
                play(inter, await getTheme(inter, theme, 'upperplanes'), true);
            }
        });

        server.player.on('error', (error) => {
            console.log(`${inter.guild.name}: ${error.message}`);
        });
    }
};
