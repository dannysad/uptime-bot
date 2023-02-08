const Discord = require("discord.js")
exports.run = async(client, message, args) => {
    message.channel.send("**Sunucum**\nhttps://discord.gg/X892k4Y8pQ")

  };

  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
  };

  module.exports.help = {
    name: "davet",
    description: "Davet linki",
    usage: "Davet Linki"
  };