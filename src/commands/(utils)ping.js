const Command = require('../structures/Command.js');
const config = require('../assets/env/config.json');
const styles = require('../assets/env/styles.json');
const colors = require('colors');

const { MessageEmbed } = require('discord.js');


module.exports = new Command({
    name: 'ping',
    aliases: ['latency', 'connection'],
    category: 'UTILITIES',
    version: '0.1.0',
    description: "Displays Eevee's latency to Discord's API.",
    usage: `${config.prefix}ping`,
    permissions: config.permissions.utility,

    async run (message, args, client) {

        // Calculating client and message ping
        try {
            let ping = await message.channel.send(`Client Ping: \`${client.ws.ping}ms\``);
            ping.edit(`Client Ping: \`${client.ws.ping}ms\`\nMessage Ping: \`${ping.createdTimestamp - message.createdTimestamp}ms\``);
        } catch(err_1a) {
            console.error(`-> ping-1a: ${err_1a}`.red);
            
            const unknownErrorEmbed = new MessageEmbed()
            .setColor(styles.color.error)
            .setDescription(`**${styles.emote.error} Unknown Error**\nSorry, something went wrong on our end!\n\nPlease try again later or submit a report [here](${config.issues})!`);

            return message.channel.send({ embeds: [unknownErrorEmbed] }).catch(err_1b => {
                return console.error(`-> ping-1b: ${err_1b}`.red);
            });
        }
    }
});
