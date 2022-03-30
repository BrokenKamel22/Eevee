const Discord = require('discord.js');
const Client = require('./Client.js');


/**
 * @param {Discord.Message | Discord.Interaction} message
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(message, args, client) {}

class Command {
    /**
     * @typedef {{name: string, aliases: string[], category: string, version: string, description: string, usage: string, permissions: string[], run: RunFunction}} CommandOptions
     * @param {CommandOptions} options
     */

    constructor(options) {
        this.name = options.name;
        this.aliases = options.aliases;
        this.category = options.category;
        this.version = options.version;
        this.description = options.description;
        this.usage = options.usage;
        this.permissions = options.permissions;
        this.run = options.run;
    }
}

module.exports = Command;
