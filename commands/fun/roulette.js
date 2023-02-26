/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Chooses a random person from the server as the winner of something')
        .addStringOption((option) =>
            option.setName('message').setDescription('What the person wins.').setRequired(true)
        ),
    group: 'fun',
    async execute(inter) {
        const value = inter.options.getString('message');
        await inter.guild.members
            .fetch()
            .then((members) => {
                const chosen = members.filter((m) => !m.user.bot).random();
                inter.reply(`The winner of: "${value}" is: **${chosen.displayName}**`);
            })
            .catch(console.error);
    }
};
