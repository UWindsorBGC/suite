/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import { MessageActionRow, MessageSelectMenu } from 'discord.js';

export class Menu {
    constructor(inter, message, items, embeds) {
        this.inter = inter;
        this.items = items;
        this.message = message;
        this.embeds = embeds;
    }

    build() {
        const menu = new MessageActionRow().addComponents(
            new MessageSelectMenu().setCustomId('menu').setPlaceholder('Choose an item.').addOptions(this.items)
        );

        return menu;
    }

    async make() {
        const filter = (i) => i.user.id === this.inter.member.id;

        const collector = this.inter.channel.createMessageComponentCollector(filter, { componentType: 'SELECT_MENU' });

        await this.inter.reply({ content: this.message, components: [this.build()] });

        collector.on('collect', async (i) => {
            if (i.customId === 'menu') {
                await i.update({ content: this.message, embeds: [this.embeds[i.values[0]]] });
            }
        });
    }
}
