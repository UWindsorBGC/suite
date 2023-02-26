/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice with 3 parameters, modifier, max and times. The default max is 20.')
        .addNumberOption((option) => option.setName('modifier').setDescription('Adds + n to your roll.'))
        .addNumberOption((option) => option.setName('max').setDescription('Sets the max number, default is 20.'))
        .addNumberOption((option) => option.setName('times').setDescription('How many dice you roll.')),
    group: 'dnd',
    async execute(inter) {
        const max = inter.options.getNumber('max') || 20;
        const mod = inter.options.getNumber('modifier') || 0;
        const times = inter.options.getNumber('times') || 1;

        let rolls = [];
        let sum = 0;
        for (let i = 0; i < times; i++) {
            let random = Math.floor(Math.random() * max) + 1;
            rolls[i] = random;
            sum += random;
        }

        await inter.reply(
            `**Rolls:** ${rolls.join(', ')} \n**Total:** __${sum}__ + ${mod} = **${sum + mod}** :game_die:.`
        );
    }
};
