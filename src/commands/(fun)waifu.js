const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = new Command({
    name: 'waifu',
    aliases: [],
    category: 'FUN',
    version: '0.1.0',
    description: "Displays a random waifu (SFW) for your enjoyment.",
    usage: 'waifu',

    async run(message, args, client) {

        // Obtaining waifu media from waifu-love API
        const { data } = await axios('https://neko-love.xyz/api/v1/waifu').catch(async err_1a => {
            console.error(`-> waifu-1a: ${err_1a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> waifu-1b: ${err_1b}`.red);
            });
        });

        // Sending the response to event channel
        try {
            const waifuEmbed = new MessageEmbed()
            .setColor(styles.color.fun)
            .setImage(data.url);

            return message.channel.send({ embeds: [waifuEmbed] });
        } catch(err_2a) {
            console.error(`-> waifu-2a: ${err_2a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_2b => {
                return console.error(`-> waifu-2b: ${err_2b}`.red);
            });
        }
    }
});
