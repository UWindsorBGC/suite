/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder().setName('hello').setDescription('Checks if the bot is online.'),
    group: 'general',
    async execute(inter) {
        await inter.reply('https://tenor.com/view/obi-wan-kenobi-star-wars-hello-there-ewan-mcgregor-gif-16358959');
    }
};
