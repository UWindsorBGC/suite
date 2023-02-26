/*
    Last Edited by: Morose#6189
    Date: February 25, 2023.
*/

import config from '../../config.json';
import { formatDate, formatDesc } from '../../tools/tools';

export const load = async () => {
    const url = `https://discord.com/api/v9/guilds/${config.guild}/scheduled-events`;

    try {
        const res = await fetch(url, {
            headers: {
                authorization: `Bot ${config.token}`
            }
        });

        let data = await res.json();

        // Taking API data and formatting it in backend.
        // TODO: Change this to merge sort.
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length - i - 1; j++) {
                if (data[j].scheduled_start_time > data[j + 1].scheduled_start_time) {
                    let temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
        const image = 'https://cdn.discordapp.com/guild-events/';

        const vcs = {
            '1009879946065350797': 'Exec Meetings',
            '984198043630960681': 'Tavern',
            '1066514606719254638': 'Bandy Time',
            '957631554329411584': 'Table 1'
        };

        let events = [];
        for (let i = 0; i < data.length; i++) {
            events[i] = {
                name: data[i].name,
                image: data[i].image ? `${image}${data[i].id}/${data[i].image}.png?size=1024` : null,
                location: data[i].entity_metadata
                    ? data[i].entity_metadata.location
                    : `${vcs[data[i].channel_id]} Voice Channel`,
                description: data[i].description ? formatDesc(data[i].description) : 'No description provided.',
                start_time: formatDate(data[i].scheduled_start_time),
                end_time: data[i].channel_id ? 'TBD' : formatDate(data[i].scheduled_end_time),
                status: data[i].status
            };
        }

        return { events };
    } catch (error) {
        return { success: false };
    }
};
