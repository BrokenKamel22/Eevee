const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = new Command({
    name: 'pat',
    aliases: [],
    category: 'FUN',
    version: '0.1.0',
    description: "Give a head pat to someone who deserves it.",
    usage: 'pat [@user]',

    async run(message, args, client) {

        // Obtaining command parameters
        const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : message.author;
        
        // Obtaining patting media from neko-love API
        const { data } = await axios('https://neko-love.xyz/api/v1/pat').catch(async err_1a => {
            console.error(`-> pat-1a: ${err_1a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> pat-1b: ${err_1b}`.red);
            });
        });

        // Sending the response to event channel
        try {
            const pattingEmbed = new MessageEmbed()
            .setColor(styles.color.fun)
            .setImage(data.url);

            return message.channel.send({
                content: user === message.author
                    ? `${user} gave themselves head pats because they deserve it :)`
                    : `${message.author} gave a few head pats to ${user}!`,
                embeds: [pattingEmbed]
            });
        } catch(err_2a) {
            console.error(`-> pat-2a: ${err_2a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_2b => {
                return console.error(`-> pat-2b: ${err_2b}`.red);
            });
        }
    }
});
