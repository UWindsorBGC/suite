/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roasts the mentioned user or you.')
        .addUserOption((option) => option.setName('target').setDescription('The person to roast')),
    group: 'fun',
    async execute(inter) {
        let user = inter.options.getMember('target') || inter.member;

        const insults = [
            `I know nothing about ${user} to roast them, this means they have no life to roast.`,
            `**${user}**'s jokes are as funny as the roasts in this bot, they are not funny.`,
            `I searched cows on Google Images and it returned pictures of ${user}'s mom.`,
            `**${user}** is getting roasted by a bot, therefore they get no bitches.`,
            `No need to roast ${user} if their name is already a joke.`,
            `The mask mandate existed so that we do not have to look at ${user}'s full face.`,
            `COVID-19 was afraid of getting infected by ${user}.`,
            `They said that stupidity cannot be transmitted, they're wrong just ask ${user}.`,
            `Superman would not save ${user}.`,
            `${user} makes Homelander look normal.`,
            `They did not come back for ${user} in The Martian.`,
            `Not even Darth Vader would say he is ${user}'s father.`,
            `${user} is the reason why Obi-Wan Kenobi stays on the high ground.`,
            `When Medusa looks at ${user} she turns into stone.`,
            `Sleeping with ${user}'s mom is a herculean task.`,
            `Oh ${user}, said no one ever.`,
            `${user} is evidence that god lives in fear of what he created.`,
            `Writing jokes about ${user} is hard, because there is nothing funny about them.`,
            `${user} was born on a highway, where most accidents happen.`,
            `${user} is so boring that I am not even going to roast them.`,
            `Gotye is thankful that ${user} was somebody he used to know.`,
            `My Chemical Romance will not save ${user} from the beatings and being damned.`,
            `It is not a blue sky when ${user} is around.`,
            `Deep Thought searched for eons to see if ${user}'s life has meaning, they do not.`,
            `${user} is so ugly that Morose is roasting them through a bot to avoid seeing them.`,
            `${user} makes Frankenstein's monster look like a normal person.`,
            `https://i.kym-cdn.com/photos/images/newsfeed/002/297/368/17f.jpg`,
            `${user} is so ugly that the Terminator will not be back.`,
            `${user} is a cool person. || bazinga ||`,
            `The world is ugly, but ${user} is not beautiful to me.`,
            `${user} has the ability to jam guns, because bullets do not want to touch them.`,
            `${user} is so ugly that not even Darth Vader would want to force choke them.`,
            `I was created to roast, but I do not think you are worthy of being roasted ${user}.`,
            `Calling ${user} ugly is a insult to ugly people.`,
            `${user} haunts Freddy Krueger in his dreams.`,
            `Jason Vorhees refuses to get ${user}'s blood all over him.`,
            `When Emmet looked at ${user}, everything was not awesome.`,
            `${user} will not go to heaven and hell.`,
            `The Weeknd could not feel his face when he was with ${user}.`,
            `Sombra would not boop ${user}.`,
            `${user} 👎`
        ];

        await inter.reply({
            content: insults[Math.floor(Math.random() * insults.length)],
            allowedMentions: { parse: ['users'] }
        });
    }
};
