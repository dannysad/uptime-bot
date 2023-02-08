const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  const Athenâx = new Discord.MessageEmbed()

  .setTitle('LA Uptime Yardım Menüsü') //başlığınız.

  .setColor('WHİTE') // Embed Rengi

  .addField('+link ekle','Projeni sisteme eklersin') //Yardım Komutlarınız

  .setThumbnail(client.user.avatarURL())

  .addField('+link sil','Projeni sistemden silersin')

  .addField('+link liste','Projelerine bakarsın.')

  .addField('+davet','Destek sunucusunun linkini vs alırsın')

  .addField('+uptime','Botun ne kadar süredir aktif olduğuna bakarsın')
  
    
 
  
message.channel.send(Athenâx)

 

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yardım"],
  permLevel: 0
}

exports.help = {
  name: 'yardım'


};
