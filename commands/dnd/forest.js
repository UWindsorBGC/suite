/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { AudioPlayerStatus } from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import { play, getTheme } from '../../tools/tools.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('forest')
        .setDescription('Plays forest themed music for campaigns, default command plays ambient music.')
        .addStringOption((sub) =>
            sub
                .setName('theme')
                .setDescription('Plays other themes.')
                .addChoices({ name: 'battle', value: 'battle' }, { name: 'night ambience', value: 'night' })
        ),
    group: 'dnd',
    async execute(inter) {
        if (!inter.member.voice.channelId) {
            return await inter.reply({ content: 'You need to be in a voice channel', ephemeral: true });
        }

        const theme = inter.options.getString('theme') || 'ambience';

        play(inter, await getTheme(inter, theme, 'forest'), true);

        await inter.reply(`Playing forest ${theme} in **${inter.member.voice.channel.name}** :evergreen_tree:`);

        let server = inter.client.queue[inter.guild.id];

        server.player.on(AudioPlayerStatus.Idle, async () => {
            if (server.loop) {
                play(inter, await getTheme(inter, theme, 'forest'), true);
            }
        });

        server.player.on('error', (error) => {
            console.log(`${inter.guild.name}: ${error.message}`);
        });
    }
};
