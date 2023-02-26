/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('addmusic')
        .setDescription('Adds royalty free music to a specific theme for use in D&D sessions')
        .addStringOption((option) =>
            option
                .setName('theme')
                .setDescription('The theme the music will be put in')
                .addChoices(
                    { name: 'artic', value: 'artic' },
                    { name: 'desert', value: 'desert' },
                    { name: 'feywild', value: 'feywild' },
                    { name: 'forest', value: 'forest' },
                    { name: 'jungle', value: 'jungle' },
                    { name: 'lowerplanes', value: 'lowerplanes' },
                    { name: 'swamp', value: 'swamp' },
                    { name: 'underdark', value: 'underdark' },
                    { name: 'underwater', value: 'underwater' },
                    { name: 'upperplanes', value: 'upperplanes' }
                )
                .setRequired(true)
        )

        .addStringOption((option) =>
            option.setName('ambience').setDescription('Link to ambient music').setRequired(true)
        )
        .addStringOption((option) => option.setName('battle').setDescription('Link to battle').setRequired(true))
        .addStringOption((option) => option.setName('night').setDescription('Link to night music')),
    async execute(inter) {
        let theme = inter.options.getString('theme');
        let ambience = inter.options.getString('ambience');
        let battle = inter.options.getString('battle');
        let night = inter.options.getString('night') || null;

        let db = inter.client.pool;

        await db.query('INSERT INTO themes VALUES($1, $2, $3, $4);', [theme, ambience, battle, night], (error) => {
            if (error) return console.log(error);
        });

        await inter.reply(`Added music for **${theme}**.`);
    }
};
