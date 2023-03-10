const Discord = require('discord.js')
module.exports = async message => {
  
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type !== 'text') return;

  let prefix = client.ayarlar.prefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  if(message.author.id !== "894199975368593459") { client.channels.cache.get("950409799416295487").send(`${message.author.tag} ${cmd.help.name} komutunu kullandı.`) }

};
