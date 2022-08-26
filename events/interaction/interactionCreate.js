module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands[interaction.commandName] || Object.values(client.commands).find(c => c.aliases?.includes(interaction.commandName));

    if (!command) return interaction.error("Cette commande n'existe pas ou n'existe plus.");

    command.run({ client, interaction });
    console.log(`${interaction.user.tag} à fait la commande ${interaction.commandName}`);
  }
};