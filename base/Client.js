const { ApplicationCommandType, Client, GatewayIntentBits, Partials } = require("discord.js");
const { lstatSync, readdirSync } = require("fs");

class CustomClient extends Client {
  constructor(options) {
    super({
      allowedMentions: { parse: ["users"], repliedUser: true },
      partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildVoiceStates],
      intents: 4751
    });

    this.commands = {};
    this.slashs = [];
    this.config = options.config;
  }

  login(token) {
    this.loadCommands()
    this.loadEvents()
    super.login(token);
    return this;
  }

  loadCommands() {
    readdirSync("./commands").forEach(category => {
      readdirSync(`./commands/${category}`).filter(file => lstatSync(`./commands/${category}/${file}`).isFile() && file.endsWith(".js")).forEach(file => {
        const command = require(`../commands/${category}/${file}`);
        const commandName = file.split(".")[0];

        if (command.type === ApplicationCommandType.ChatInput) {
          this.slashs.push({
            name: commandName,
            description: command.description,
            options: command.options,
            permissions: command.permissions || [],
            defaultPermssion: command.permissions?.length !== null,
            type: command.type
          });
        } else {
          this.slashs.push({ name: commandName, type: command.type });
        }

        this.commands[commandName] = Object.assign(command, { category: category, name: commandName });

        if (command.aliases) {
          command.aliases.forEach(alias => {
            if (command.type === ApplicationCommandType.ChatInput) {
              this.slashs.push({
                name: alias,
                description: command.description,
                options: command.options,
                permissions: command.permissions || [],
                defaultPermssion: command.permissions?.length !== null,
                type: command.type
              });
            } else {
              this.slashs.push({ name: alias, type: command.type });
            }
          });
        }
      });
    });
  }

  loadEvents() {
    readdirSync("./events").forEach(category => {
      readdirSync(`./events/${category}`).forEach(file => {
        const event = require(`../events/${category}/${file}`);

        super.on(file.split(".")[0], (...args) => event(this, ...args));
      });
    });
  }

}

module.exports = CustomClient;