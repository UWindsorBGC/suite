import { joinVoiceChannel, createAudioResource, createAudioPlayer, PlayerSubscription } from '@discordjs/voice';
import ytdl from 'ytdl-core';

export function chunk(array, size) {
    let copy = array;
    let chunkedArray = [];
    for (let i = 0; i < copy.length; i += size) {
        chunkedArray.push(copy.slice(i, i + size));
    }

    return chunkedArray;
}

export function play(inter, url, loop) {
    let bot = inter.client;

    let stream = ytdl(url, {
        filter: 'audioonly',
        fmt: 'mp3',
        highWaterMark: 1 << 62,
        liveBuffer: 1 << 62,
        dlChunkSize: 0,
        bitrate: 128,
        quality: 'lowestaudio'
    });

    const con = joinVoiceChannel({
        channelId: inter.member.voice.channel.id,
        guildId: inter.guild.id,
        adapterCreator: inter.guild.voiceAdapterCreator
    });

    if (!bot.queue[inter.guild.id]) {
        bot.queue[inter.guild.id] = {
            player: createAudioPlayer(),
            source: createAudioResource(stream, { inlineVolume: true }),
            queue: [url],
            volume: 0.05,
            loop: loop,
            channel: inter.member.voice.channel.id
        };

        let server = bot.queue[inter.guild.id];

        con.subscribe(server.player);
        server.player.play(server.source);
        server.source.volume.setVolume(server.volume);
    } else {
        let server = bot.queue[inter.guild.id];
        if (server.queue.length == 0) {
            server.queue.push(url);
        }
        server.source = createAudioResource(stream, { inlineVolume: true });
        con.subscribe(server.player);
        server.player.play(server.source);
        server.source.volume.setVolume(server.volume);
    }
}

export function playLocal(inter, path, loop) {
    let bot = inter.client;
    const con = joinVoiceChannel({
        channelId: inter.member.voice.channel.id,
        guildId: inter.guild.id,
        adapterCreator: inter.guild.voiceAdapterCreator
    });

    if (!bot.queue[inter.guild.id]) {
        bot.queue[inter.guild.id] = {
            player: createAudioPlayer(),
            source: createAudioResource(path, { inlineVolume: true }),
            queue: [],
            volume: 0.05,
            loop: loop,
            channel: inter.member.voice.channel.id
        };

        let server = bot.queue[inter.guild.id];

        con.subscribe(server.player);
        server.player.play(server.source);
        server.source.volume.setVolume(server.volume);
    } else {
        let server = bot.queue[inter.guild.id];
        server.source = createAudioResource(path, { inlineVolume: true });
        con.subscribe(server.player);
        server.player.play(server.source);
        server.source.volume.setVolume(server.volume);
    }
}

export async function getTheme(inter, type, theme) {
    let res = await inter.client.pool.query('SELECT * FROM themes WHERE theme = $1 ORDER BY RANDOM() LIMIT 1', [theme]);
    return res.rows[0][type];
}

// Formats ISO8601 Timestamps to a readable format.
export function formatDate(timestamp) {
    const date = new Date(timestamp);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    const hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours() + 12;
    const meridian = hour > 12 ? 'AM' : 'PM';
    const minutes = date.getMinutes() == 0 ? date.getMinutes() + '0' : date.getMinutes();

    return `${day} ${month} ${date.getDate()} at ${hour == 0 ? 12 : hour}:${minutes} ${meridian}`;
}

export function formatDesc(desc) {
    desc.replace('\n', '<br>');
    desc.replace(/\*{1,}([ a-z0-9]+)_{1,}/gim, '<b>$1</b>');
    return desc;
}
