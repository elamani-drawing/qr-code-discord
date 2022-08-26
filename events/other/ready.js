require("dotenv/config");

module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  await guild.commands.set(client.slashs);
  console.log(`[${client.user.username}]: I'm ready.`);
};