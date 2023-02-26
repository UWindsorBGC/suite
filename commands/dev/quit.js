/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder().setName('quit').setDescription('Makes the bot shutdown'),
    group: 'dev',
    async execute(inter) {
        await inter.reply({ content: 'Bot has been shutdown', ephemeral: true });
        await inter.client.destroy();
        process.exit(0);
    }
};
