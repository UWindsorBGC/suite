/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js';

export class Paginator {
    constructor(inter, pages) {
        this.inter = inter;
        this.pages = pages;
        this.current = -1;
    }

    info() {
        const info = new EmbedBuilder()
            .setColor('800080')
            .setAuthor({ name: 'Paginator Help', iconURL: this.inter.client.user.avatarURL() })
            .setDescription(
                'This a paginator, press the buttons to turn the page. This is useful for displaying lots of content without visually cluttering the screen.'
            )
            .addFields(
                {
                    name: 'Next Page →',
                    value: 'This will take you to the next page. If you are on last page it will go back to the first one.',
                    inline: false
                },
                {
                    name: 'Previous Page ←',
                    value: 'This will take you to the previous page. If you are on the first page it will go to the last one.',
                    inline: false
                },
                {
                    name: 'Last Page | End',
                    value: 'This will take you to the last page.',
                    inline: false
                },
                {
                    name: 'First Page | Start',
                    value: 'This will take you to the first page.',
                    inline: false
                }
            )
            .setFooter({ text: 'Preface' });

        return info;
    }

    buttons() {
        const buttons = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('back').setLabel('←').setStyle('PRIMARY'),
            new MessageButton().setCustomId('next').setLabel('→').setStyle('PRIMARY'),
            new MessageButton().setCustomId('start').setLabel('Start').setStyle('SECONDARY'),
            new MessageButton().setCustomId('end').setLabel('End').setStyle('SECONDARY'),
            new MessageButton().setCustomId('exit').setLabel('Exit').setStyle('DANGER')
        );

        return buttons;
    }

    async paginate() {
        if (this.pages.length === 1) {
            return await this.inter.reply({ embeds: this.pages });
        }

        await this.inter.reply({ embeds: [this.info()], components: [this.buttons()] });

        const filter = (i) =>
            i.user.id === this.inter.member.id && i === this.inter.isButton() && i.message.id === this.inter.message.id;

        const collector = this.inter.channel.createMessageComponentCollector(filter, {
            componentType: 'BUTTONS',
            time: 150
        });

        let buttons = ['back', 'next', 'start', 'end', 'exit'];

        collector.on('collect', async (i) => {
            if (buttons.includes(i.customId)) {
                switch (i.customId) {
                    case 'next':
                        await i.update({
                            embeds: [
                                this.pages[this.current !== this.pages.length - 1 ? ++this.current : (this.current = 0)]
                            ]
                        });
                        break;
                    case 'back':
                        await i.update({
                            embeds: [
                                this.pages[this.current !== 0 ? --this.current : (this.current = this.pages.length - 1)]
                            ]
                        });
                        break;
                    case 'start':
                        await i.update({ embeds: [this.pages[0]] });
                        break;
                    case 'end':
                        await i.update({ embeds: [this.pages[this.pages.length - 1]] });
                        break;
                    case 'exit':
                        await i.message.delete();
                }
            }
        });
    }
}
