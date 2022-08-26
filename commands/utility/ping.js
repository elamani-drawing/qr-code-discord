const { ApplicationCommandType } = require("discord.js");

module.exports = {
  description: "Affiche le ping du bot.",
  type: ApplicationCommandType.ChatInput,
  async run({ client, interaction }) {
    interaction.reply(`:ping_pong: Pong ! Gateway: \`${client.ws.ping}ms\`.`);
  }
};