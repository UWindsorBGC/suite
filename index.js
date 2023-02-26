/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import fs from 'node:fs';
import pkg from 'pg';
const { Pool } = pkg;
import { Client, GatewayIntentBits, IntentsBitField, Collection, Partials } from 'discord.js';

import config from './config.json' assert { type: 'json' };

export const bot = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            IntentsBitField.Flags.GuildVoiceStates,
            IntentsBitField.Flags.GuildScheduledEvents
        ]
    },
    { partials: [Partials.Message, Partials.Channel, Partials.Reaction] }
);

bot.commands = new Collection();
bot.queue = {};
bot.pool = new Pool({
    user: config.db.username,
    host: config.db.host,
    database: config.db.name,
    password: config.db.password
});

let groups = ['dev', 'general', 'dnd', 'fun', 'mod'];
for (const group of groups) {
    const commandsPath = `./commands/${group}`;
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const { command } = await import(`./commands/${group}/${file}`);
        bot.commands.set(command.data.name, command);
    }
}

// This makes the bot more "alive".
let status = [
    'Dungeons & Dragons',
    'Board Games',
    'Chess',
    'Coup',
    'Connect 4',
    'Scrabble',
    'UNO',
    'Checkers',
    'with you',
    'with your mom',
    'My Chemical Romance',
    'Checkers',
    'Cards Against Humanity',
    'with Matt Mercer',
    'Overwatch',
    'Joan Jett & The Blackhearts',
    'Apex Legends',
    'with fire',
    'DOOM Eternal',
    'D&D with Critical Role',
    'with your feelings',
    'the guitar'
];

bot.once('ready', async () => {
    console.log('Let the adventure begin.');
    console.log(`Discord.js version ${(await import('discord.js')).version}`);
    console.log(`YTDL-Core version ${(await import('ytdl-core')).version}`);
    console.log(`PG version ${(await import('pg')).version}`);
    console.log(`Node version ${process.version}`);
    let cStatus = status[Math.floor(Math.random() * status.length)];
    bot.user.setActivity(cStatus);
    console.log(`Current status: ${cStatus}`);
    // This resets all commands, uncomment if there is duplicated commands, or glitch.
    // bot.application.commands.set([]);
});

bot.on('interactionCreate', async (inter) => {
    if (!inter.isCommand()) return;

    const command = bot.commands.get(inter.commandName);

    if (!command) return;

    if (command.group === 'dev' && inter.member.id !== config.developer) {
        return await inter.reply({ content: '**You are not the developer of this bot!**', ephemeral: true });
    }

    if (command.group === 'mod' && inter.member.roles.cache.some((role) => role.id === '1072721653974450277')) {
        return await inter.reply({ content: '**You are not an executive on the server!**', ephemeral: true });
    }

    try {
        await command.execute(inter);
    } catch (error) {
        console.error(error);
        await inter.reply({ content: `Error encountered: \`\`\`js\n${error}\`\`\``, ephemeral: true });
    }
});

bot.on('error', (error) => {
    console.log(error.message);
});

bot.login(config.token);

process.on('SIGINT', async function () {
    console.log('Shutting down bot! \n');
    await bot.destroy();
    process.exit(0);
});
