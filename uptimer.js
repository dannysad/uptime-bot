const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const http = require("http");
const express = require("express");
const kontrol = require("node-fetch");
const data = require('quick.db');
require("./util/eventLoader")(client);

client.ayarlar = { "prefix": "+", "sahip": "894199975368593459" };

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login(process.env.token);

client.on('ready', async () => {
client.user.setActivity(`Özelden: ${client.ayarlar.prefix}link ekle/liste/sil url/hepsi |`)
client.user.setStatus('dnd');
});

setInterval(() => {
const linkler = data.fetch('chimped');
if(linkler) {
if(linkler.length > 0) {
linkler.forEach(s => {
kontrol(s.site).catch(err => {
console.log('');
console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
console.log('');
})
console.log(`${s.site} uptime edildi. Sahibi: ${s.sahipTag}`);
})
}
}
}, 60000)



// EKLENİNCE MESAJ 
client.on("guildCreate", async guild => {
  guild.owner.send("<@" + guild.owner.id + "> **LA Uptime** Botu Eklemeniz Bizi Sevindirdi Altta Yazanlarla Botu Kullanabilir VEYA Sorularınızı Bize Sorabilirsiniz! \n- Botun prefixi(ön-ek) `la.` \n- Bize Birşey Bildirmek İçin Sunucuma gel! \n- Sunucum: https://discord.gg/X892k4Y8pQ");
});


client.on("guildDelete", async guild => {
  guild.owner.send("<@" + guild.owner.id + "> **LA Uptime** Botu Atmanız Bizi Üzdü Alttaki Bağlantılardan Bize Ulaşarak Sıkıntını Sorabilirsin! \n- Sunucum: https://discord.gg/X892k4Y8pQ");
});
// ATILINCA MESAJ 

