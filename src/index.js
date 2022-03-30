const Client = require('./structures/Client.js');
const Command = require('./structures/Command.js');
const config = require('./assets/env/config.json');
const styles = require('./assets/env/styles.json');
const colors = require('colors');

const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js');


// Declaring a Discord client alias
const client = new Client();

// Loading valid command files
console.log(`\nLoading valid command files...`.bold);
readdirSync('src/commands').filter(file => file.endsWith('.js')).forEach(file => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);

    // Setting command file to command type
    try {
        client.commands.set(command.name, command);
        console.log(`-> Loaded command: (${command.category.toUpperCase()}) [${command.version}] ${command.name}`);
    } catch(err_1a) {
        console.error(`-> Could not load ${file.toUpperCase()}`);
    }
});
console.log(`\nEstablishing online status...`.bold);

// Notifying client status upon initialization
client.on('ready', () => {
    console.log(`-> Client Eevee ready in ${client.guilds.cache.size} servers!`);
    try {
        client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size} servers!`);
        console.log(`-> Discord status set`);
    } catch(err_2a) {
        console.error(`-> index-2a: ${err_2a}`.red);
    } finally {
        console.log(`\nError log`.bold);
    }
});

// Updating client status on guild join
client.on('guildCreate', () => {
    try {
        client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size} servers!`);
    } catch(err_3a) {
        console.error(`-> index-3a: ${err_3a}`.red);
    }
});

// Updating client status on guild leave
client.on('guildDelete', () => {
    try {
        client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size} servers!`);
    } catch(err_3b) {
        console.error(`-> index-3b: ${err_3b}`.red);
    }
});

// Monitoring for new message interactions
client.on('messageCreate', async message => {

    // Returning for invalid event calls
    if (!message.content.startsWith(config.prefix)) {
        return null;
    } else if (message.author === client.user) {
        return null;
    }

    // Obtaining event information
    const args = message.content.toLowerCase().substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0] || cmd.aliases.find(alias => alias === args[0]));

    // Returning for invalid command calls
    if (!command) {
        const invalidCommandEmbed = new MessageEmbed()
        .setColor(styles.color.error)
        .setDescription(`**${styles.emote.error} Invalid Command**\n\`${args[0]}\` is not a valid command!\n\nPlease use \`${config.prefix}help\` for a full list of commands!`);

        return message.channel.send({ embeds: [invalidCommandEmbed] }).catch(err_4a => {
            return console.error(`-> index-4a: ${err_4a}`.red);
        });
    }

    // Passing parameters to command function
    try {
        command.run(message, args, client);
    } catch(err_5a) {
        console.error(`-> index-5a: ${err_5a}`.red);
        return message.reply(`${styles.emote.error} ${responses.error}`).catch(err_5b => {
            console.error(`-> index-5b: ${err_5b}`.red);
        });
    }
});

// Connecting to client
client.login(config.client.token).catch(err_6a => {
    return console.error(`-> ${err_6a}`.red);
});
