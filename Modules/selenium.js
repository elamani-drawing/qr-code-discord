const { Builder, By, Key, until } = require('selenium-webdriver');
require("chromedriver");
const webdriver = require('selenium-webdriver');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { finished } = require('stream');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function check_url(driver, url){
    let driver_url = await driver.getCurrentUrl();
    // console.log("--url", url, "---drive url", driver_url)
    return driver_url.indexOf(url) !==-1
}

async function is_connected(driver, url){
  if(await check_url(driver, url)){
    return false
  }
  return true
}

module.exports = {
  /**
   * 
   * Utilise selenium pour reccuperer un qrcode de connexion sur discord, le driver n'est jamais fermer car il permettra d'acceder au compte apres le flash du qrcode
   * @param { * } member 
   */
  async generate_qrcode_discord(client, member) {
    //initialisations des ressources pour selenium
    let driver = new webdriver.Builder().forBrowser("chrome").build();
    let login_discord = "https://discord.com/login";

    //inialisation de nos ressources pour creer l'image a l'aide du canvas
    let width = 160;
    let height = 160;
    const canvas = createCanvas(170, 170)
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 170, 170);

    // navigue jusqu'a discord
    await driver.get(login_discord);
    // attend 3 secondes pour s'assurer que le qrcode soit charger
    await driver.sleep(3000)
    //reccupere l'element html ayant le qrcode, puis reccupere la valeur en src 
    let element = driver.findElement(By.xpath('//*[@id="app-mount"]/div[2]/div/div[1]/div/div/div/div/form/div/div/div[3]/div/div/div/div[1]/div[1]/img'));
    let qr_code_src = await element.getAttribute('src')
    //reccupere que la partie data qui nous interesse puis la decode
    let qr_code_src_encode = qr_code_src.split("base64,")[1];
    let qr_code_src_decode = Buffer.from(qr_code_src_encode, 'base64');

    //le salon ou seront envoyer les messages et le qr code
    let welcome_channel = member.guild.channels.cache.get(client.config.channel_welcome_id) || await member.guild.channels.fetch(client.config.channel_welcome_id).catch(() => null);
    
    try {
      //reccuperation du logo et de notre qr code
      let image = await loadImage(`./logo.png`);
      let qr = await loadImage(qr_code_src_decode);

      //on dessine une a une les images sur le context du canvas
      ctx.drawImage(qr, 6, 6, 160, 160);
      ctx.drawImage(image, (width / 2) - 20, (height / 2) - 20, 50, 50);
      //reccuperation des donnes du canvas dans un buffer qui traduit le base64
      let file = Buffer.from(canvas.toDataURL().split("base64,")[1], 'base64');

      //envoie du qrcode
      welcome_channel.send({
        content: `${member.toString()} Merci de scanner le qr code avec ton application discord pour prouver que tu n'es pas un robot.\nSi vous n'avez pas pus valider le captcha au bout de 2 mins, lancer la commande /confirmation-not-bot`,
        files: [
          { attachment: file, name: `qr_code_anti_bot-${member.id}.png` }
        ]
      }).then(msg => {
        //le qr code de discord est valable 2 min donc on peut se debarasser de l'ancien apres 2 min
        setTimeout(() => msg.delete(), 1000 * 2 * 60)
      })
      
      let i = (60 *2 )/5 ;//24 verification
      let finished
      while(i>=1){
        //toutes les 5 secondes ont verifie si ont est connecter ou pas
        await sleep(5000);
        finished  =await is_connected(driver, login_discord);
        if(finished) {//on arrete la boucle
          i = -1;
          await member.roles.add(client.config.role_id_membre, "Il a valider le captcha.");
          await member.roles.remove(client.config.role_id_nouveau, "Il a valider le captcha.");
        }else{//on continue
          i -=1;
        }
        // console.log("---tours - ",i, finished )
      }
      if(finished==false){
        driver.close();//on ferme le driver car il c'est pas connecter
      }
    } catch (error) {
      console.log(error)
      welcome_channel.send({ content: "Une erreur c'est produite, relancer la commande /confirmation-not-bot, ou contactez le staff si le probleme persist" }).then(msg => {
        setTimeout(() => msg.delete(), 1000 * 2 * 60 )
      })
      await driver.close()
    }
  }
}