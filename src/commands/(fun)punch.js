const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = new Command({
    name: 'punch',
    aliases: [],
    category: 'FUN',
    version: '0.1.0',
    description: "Give a punch to someone who deserves it.",
    usage: 'punch [@user]',

    async run(message, args, client) {

        // Obtaining command parameters
        const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : message.author;
        
        // Obtaining punching media from neko-love API
        const { data } = await axios('https://neko-love.xyz/api/v1/punch').catch(async err_1a => {
            console.error(`-> punch-1a: ${err_1a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> punch-1b: ${err_1b}`.red);
            });
        });

        // Sending the response to event channel
        try {
            const punchingEmbed = new MessageEmbed()
            .setColor(styles.color.fun)
            .setImage(data.url);

            return message.channel.send({
                content: user === message.author
                    ? `${user} punched themselves because they are stupid!`
                    : `${message.author} punched ${user} with the force of 10,000 rhinos!`,
                embeds: [punchingEmbed]
            });
        } catch(err_2a) {
            console.error(`-> punch-2a: ${err_2a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_2b => {
                return console.error(`-> punch-2b: ${err_2b}`.red);
            });
        }
    }
});
