const Moment = require('moment')
const Discord = require('discord.js')
let prefix = '!'
module.exports = client => {
  
  const aktiviteListesi = [
    `${client.guilds.size} sunucudan ${client.users.size} kullanıcıya hizmet veriyoruz!`,
    'la!yardım',
    'la!davet',
    'la!uptime',
    'Sahibim:LADanny#2625',
    'LADanny#2625',
    'Aktifim',
    'OnarLA',
    '7/24 Aktif',
    'LA'
  ]

  client.user.setStatus('dnd')
  
  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
  }, 7000)
}