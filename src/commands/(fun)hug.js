const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = new Command({
    name: 'cry',
    aliases: ['tear'],
    category: 'FUN',
    version: '0.1.0',
    description: "Make you or someone else cry.",
    usage: 'cry [@user]',

    async run(message, args, client) {

        // Obtaining command parameters
        const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : message.author;
        
        // Obtaining crying media from neko-love API
        const { data } = await axios('https://neko-love.xyz/api/v1/cry').catch(async err_1a => {
            console.error(`-> cry-1a: ${err_1a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> cry-1b: ${err_1b}`.red);
            });
        });

        // Sending the response to event channel
        try {
            const cryingEmbed = new MessageEmbed()
            .setColor(styles.color.fun)
            .setImage(data.url);

            return message.channel.send({
                content: user === message.author
                    ? `${user} is crying!`
                    : `${message.author} made ${user} cry!`,
                embeds: [cryingEmbed]
            });
        } catch(err_2a) {
            console.error(`-> cry-2a: ${err_2a}`.red);

            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_2b => {
                return console.error(`-> cry-2b: ${err_2b}`.red);
            });
        }
    }
});
