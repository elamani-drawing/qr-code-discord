
const { CommandInteraction, ApplicationCommandType } = require('discord.js');
const {generate_qrcode_discord} = require('./../../Modules/selenium');

module.exports = {
  description: "Confirme que tu n'es pas un bot.",
  type: ApplicationCommandType.ChatInput,
  async run({client, interaction}) {
    // await interaction.deferReply();
    if(interaction.member.roles.cache.find(role => role.id == client.config.role_id_membre)) 
    {
      interaction.reply({content:"Votre compte est déjà confirmer!", ephemeral:true})
      return
    }else {
      interaction.reply({content:"Je prepare votre qr code!", ephemeral : true})
    }
    await generate_qrcode_discord(client, interaction.member);
    console.log("qr code envoyer à ", interaction.member.user.username)
  }
}