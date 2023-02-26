/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder().setName('noroles').setDescription('Finds members without roles.'),
    group: 'dev',
    async execute(inter) {
        await inter.guild.members
            .fetch()
            .then((members) => {
                let noroles = members.filter((m) => m.roles.cache.size === 1);
                noroles = Array.from(noroles);
                console.log(noroles.join(', '));
            })
            .catch(console.error);
    }
};
