/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

import pkg from 'ytdl-core';
const { getBasicInfo } = pkg;

import { search } from 'yt-search';
import { play } from '../../tools/tools.js';
import { AudioPlayerStatus } from '@discordjs/voice';

export const command = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays YouTube links')
        .addStringOption((option) =>
            option.setName('song').setDescription('What song you want to play').setRequired(true)
        )
        .addBooleanOption((option) => option.setName('loop').setDescription('Loop the song?')),
    group: 'general',
    async execute(inter) {
        if (!inter.member.voice)
            return await inter.reply({ content: 'You need to be in a voice channel!', ephemeral: true });
        let url = inter.options.getString('song');
        const regex =
            /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g;
        const loop = inter.options.getBoolean('loop') || false;

        if (!url.match(regex)) {
            const songs = await search(url);
            if (!songs) {
                return await inter.reply('Could not find that song!');
            } else {
                url = songs.videos[0].url;
            }
        }

        if (inter.client.queue[inter.guild.id]) {
            if (inter.client.queue[inter.guild.id].queue.length >= 1) {
                inter.client.queue[inter.guild.id].queue.push(url);
                let title = (await getBasicInfo(url)).videoDetails.title;
                console.log(`${inter.guild.name}: Added ${title} to the queue`);
                return await inter.reply(`Added **${title}** to the queue.`);
            } else {
                play(inter, url, loop);
                let title = (await getBasicInfo(url)).videoDetails.title;
                console.log(`${inter.guild.name}: Playing ${title}`);
                await inter.reply(`Playing **${title}** in **${inter.member.voice.channel.name}.**`);
            }
        } else {
            play(inter, url, loop);

            let title = (await getBasicInfo(url)).videoDetails.title;
            console.log(`${inter.guild.name}: Playing ${title}`);
            await inter.reply(`Playing **${title}** in **${inter.member.voice.channel.name}.**`);

            let server = inter.client.queue[inter.guild.id];

            server.player.on(AudioPlayerStatus.Idle, async () => {
                if (server.queue.length > 1) {
                    server.queue.shift();
                    play(inter, server.queue[0], true);
                    let title = (await getBasicInfo(server.queue[0])).videoDetails.title;
                    console.log(`${inter.guild.name}: Now playing ${title}`);
                    await inter.channel.send(`Now playing **${title}** in **${inter.member.voice.channel.name}**`);
                } else {
                    server.queue = [];
                }
            });

            server.player.on('error', async (error) => {
                console.log(`${inter.guild.name}: ${error.message}`);

                if (server.queue.length > 1) {
                    server.queue.shift();
                    play(inter, server.queue[0], loop);
                    let title = (await getBasicInfo(server.queue[0])).videoDetails.title;
                    console.log(`${inter.guild.name}: Now playing ${title}`);
                    await inter.channel.send(`Now playing **${title}** in **${inter.member.voice.channel.name}**`);
                } else if (server.queue.length === 0) {
                    server.queue = [];
                } else if (server.loop) {
                    play(inter, url, loop);
                }
            });
        }
    }
};
