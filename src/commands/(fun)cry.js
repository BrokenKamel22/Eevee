const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = new Command({
    name: 'hug',
    aliases: ['embrace'],
    category: 'FUN',
    version: '0.1.0',
    description: "Give a hug to someone who deserves it.",
    usage: 'hug [@user]',

    async run(message, args, client) {

        // Obtaining command parameters
        const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : message.author;
        
        // Obtaining hugging media from neko-love API
        const { data } = await axios('https://neko-love.xyz/api/v1/hug').catch(async err_1a => {
            console.error(`-> hug-1a: ${err_1a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> hug-1b: ${err_1b}`.red);
            });
        });

        // Sending the response to event channel
        try {
            const huggingEmbed = new MessageEmbed()
            .setColor(styles.color.fun)
            .setImage(data.url);

            return message.channel.send({
                content: user === message.author
                    ? `${user} hugged themselves because they are lonely :C!`
                    : `${message.author} gave a big hug to ${user}!`,
                embeds: [huggingEmbed]
            });
        } catch(err_2a) {
            console.error(`-> hug-2a: ${err_2a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_2b => {
                return console.error(`-> hug-2b: ${err_2b}`.red);
            });
        }
    }
});
