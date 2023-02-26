/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('toast')
        .setDescription('Toasts the mentioned user or you.')
        .addUserOption((option) => option.setName('target').setDescription('The person to roast')),
    group: 'fun',
    async execute(inter) {
        let user = inter.options.getMember('target') || inter.member;

        const toasts = [
            `Nice hair ${user}.`,
            `You look wonderful ${user}!`,
            `Have you been working out ${user}?`,
            `The world is ugly, but you're beautiful to me ${user}.`,
            `Live long and prosper ${user}!`,
            `You're looking fine ${user}!.`,
            `Tight butthole ${user}!`,
            `You'd survive the apocalypse ${user}!`,
            `You're looking awfully cute today ${user}!`,
            `${user} ♥`,
            `${user} can I have your autograph?`,
            `${user} can we take a selfie?`,
            `I could get lost in those green eyes ${user}.`,
            `Pardon me for staring at beauty ${user}.`,
            `I love you ${user}!`,
            `https://i.kym-cdn.com/entries/icons/original/000/022/900/704.jpg`,
            `I should be over all the butterflies, but I'm into ${user}.`,
            `${user} 😊`,
            `You look so squishy ${user}.`,
            `You're so precious when you smile ${user}.`,
            `Ara ara ${user}.`,
            `UwU ${user}.`
        ];

        await inter.reply({
            content: toasts[Math.floor(Math.random() * toasts.length)],
            allowedMentions: { parse: ['users'] }
        });
    }
};
