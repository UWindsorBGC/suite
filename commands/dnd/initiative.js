/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Commands related to initiative.')
        .addSubcommand((sc) => sc.setName('list').setDescription('Shows the initiative order of the characters.'))

        .addSubcommand((sc) =>
            sc
                .setName('add')
                .setDescription('Adds a character to the combat initiative.')
                .addStringOption((o) =>
                    o.setName('name').setDescription('Name of the character being added.').setRequired(true)
                )
                .addNumberOption((o) => o.setName('rolled').setDescription('What you rolled.').setRequired(true))
        )

        .addSubcommand((sc) => sc.setName('end').setDescription('Ends the combat.'))

        .addSubcommand((sc) =>
            sc
                .setName('auto')
                .setDescription('Automatically rolls initiative for you based on your modifier.')
                .addStringOption((o) =>
                    o.setName('name').setDescription('Name of the character being added.').setRequired(true)
                )
                .addNumberOption((o) => o.setName('modifier').setDescription("The character's initiative modifier."))
        ),
    group: 'dnd',
    async execute(inter) {
        let bot = inter.client;
        let db = bot.pool;
        let sub = inter.options.getSubcommand();

        if (sub === 'list') {
            await db.query('SELECT * FROM initiative ORDER BY rolled DESC;', async (error, result) => {
                if (error || result.rows.length === 0) {
                    console.log(error);
                    await inter.reply('The party is not currently in combat!');
                } else {
                    let order = [];

                    result.rows.forEach((c) => {
                        order.push(`**${c.rolled}**| ${c.name}`);
                    });

                    const embed = new EmbedBuilder()
                        .setColor('800080')
                        .setAuthor({ name: 'Combat Order' })
                        .setDescription(`${order.join('\n')}`);
                    await inter.reply({ embeds: [embed] });
                }
            });
        }

        if (sub === 'add') {
            const name = inter.options.getString('name');
            const rolled = inter.options.getNumber('rolled');

            await db.query('INSERT INTO initiative VALUES($1, $2)', [name, rolled], async (error) => {
                if (error) {
                    console.log(error);
                    await inter.reply('Error adding rolls.');
                }
            });

            await inter.reply(`Added **${name}** to the combat order.`);
        }

        if (sub === 'end') {
            await db.query('DELETE FROM initiative', async (error) => {
                console.log(error);
            });

            await inter.reply('Combat has ended.');
        }

        if (sub === 'auto') {
            const name = inter.options.getString('name');
            const mod = inter.options.getNumber('modifier') || 0;
            const rolled = Math.floor(Math.random() * 20) + 1 + mod;

            await db.query('INSERT INTO initiative VALUES($1, $2)', [name, rolled], async (error) => {
                if (error) {
                    console.log(error);
                    await inter.reply('Error adding rolls.');
                }
            });

            await inter.reply(
                `Added **${name}** to the combat order with an automatically rolled initiative of **${rolled}**.`
            );
        }
    }
};
