const { CommandInteraction } = require("discord.js");

String.prototype.hexToInt = function() {
  return parseInt(this.replace("#", ""), 16);
};

Number.prototype.toHex = function() {
  return `#${this.toString(16)}`;
};

CommandInteraction.prototype.success = async function(args, { replied = true, ephemeral = false } = {}) {
  const message = {
    embeds: [{
      color: this.client.config.colors.green,
      title: "Succès",
      description: `${this.client.config.emojis.success} \`-\` ${args}`,
      footer: {
        icon_url: this.client.user.displayAvatarURL(),
        text: this.client.config.footer
      }
    }],
    ephemeral
  };

  replied === true ? this.reply(message) : this.channel.send(message);
};

CommandInteraction.prototype.error = async function(args, { replied = true, ephemeral = true } = {}) {
  const message = {
    embeds: [{
      color: this.client.config.colors.red,
      title: "Erreur",
      description: `${this.client.config.emojis.error} \`-\` ${args}`,
      footer: {
        icon_url: this.client.user.displayAvatarURL(),
        text: this.client.config.footer
      }
    }],
    ephemeral
  };

  replied === true ? this.reply(message) : this.channel.send(message);
};