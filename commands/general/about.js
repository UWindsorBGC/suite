/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder().setName('about').setDescription('Shows information about this bot.'),
    async execute(inter) {
        const bot = inter.client;

        let total = bot.uptime / 1000;
        let days = Math.floor(total / 86400);
        total %= 86400;

        let hours = Math.floor(total / 3600);
        total %= 3600;

        let minutes = Math.floor(total / 60);
        let seconds = Math.floor(total % 60);

        let uptime = `${days}d, ${hours}h, ${minutes}m, and ${seconds}s`;

        await inter.guild.members.fetch().catch(console.error);

        const about = new EmbedBuilder()
            .setColor('800080 ')
            .setAuthor({ name: 'About Dungeon Master', iconURL: bot.user.avatarURL() })
            .setDescription(
                `This bot was created for the University of Windsor Board Games Club. It was made to port some Dungeons and Dragons stuff into one bot. It also serves as a general purpose bot for the club.`
            )
            .addFields(
                {
                    name: 'Made by',
                    value: '<@!507490400534265856> (Development) & <@!411368645524979742> (Ideas)',
                    inline: true
                },
                { name: 'Library', value: 'discord.js', inline: true },
                { name: 'Uptime', value: uptime, inline: true },
                { name: 'Commands', value: `${bot.commands.size}`, inline: true },
                { name: 'Guilds', value: `${bot.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${bot.users.cache.size}`, inline: true },
                { name: 'Recent Changes', value: 'To be added', inline: false }
            );
        await inter.reply({ embeds: [about] });
    }
};
