const {generate_qrcode_discord} = require('./../../Modules/selenium');

module.exports = async (client, member) => {
  await member.roles.add(client.config.role_id_nouveau, "Un nouveau membre.");
  let welcome_channel = member.guild.channels.cache.get(client.config.channel_welcome_id) || await member.guild.channels.fetch(client.config.channel_welcome_id).catch(() => null);
  welcome_channel.send({content : `Bienvenue ${member.toString()}!`}).then(msg => {
    setTimeout(() => msg.delete(), 1000 * 2 * 60 )
  })

  await generate_qrcode_discord(client, member);
  console.log("qr code envoyer à car il vient d'arriver", member.user.username);
};