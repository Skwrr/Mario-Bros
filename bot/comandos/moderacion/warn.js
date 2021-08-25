module.exports = {
  name: "warn",
  description: "Advierte a un usuario (3 warn = kick; mb.warn set (ammount) para establecer otra cantidad maxima)",
  use: "(get/clear/set/@user) (@user/reason)",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
let db = require("megadb")
let warns = new db.crearDB("warns");

let usuario = message.mentions.members.first()
if(usuario.id === message.author.id) return message.reply("No puedes avisarte a ti mismo")
if(!warns.has(`${message.guild.id}.kicks`)){
  await warns.establecer(`${message.guild.id}.kicks`, 3)
}


if(args[0] === "get"){
  if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply("No puedes obtener los avisos de alguien")
  if(!usuario) return message.channel.send("Debes mencionar a un usuario")
  let warneos = await warns.get(`${message.guild.id}.${usuario.id}`)
  if(warneos === undefined){
    warneos = 0

    let embed = new Discord.MessageEmbed()
  .setTitle('Warneos')
  .addField('Usuario:', `<@${usuario.id}>`)
  .addField('Cantidad de sanciones:', `${warneos}`)
  .setColor('RANDOM')
  message.channel.send({embeds:[embed]});
  return true
  }
  let embed = new Discord.MessageEmbed()
  .setTitle('Warneos')
  .addField('Usuario:', `<@${usuario.id}>`)
  .addField('Cantidad de sanciones:', `${warneos}`)
  .setColor('RANDOM')
  message.channel.send({embeds:[embed]});
  return true
}


if(args[0] === "clear"){
  if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply("No puedes obtener los avisos de alguien")
  if(!usuario) return message.channel.send("Debes mencionar a un usuario")
  const warneos = await warns.get(`${message.guild.id}.${usuario.id}`)
  const newwarneos = await warns.set(`${message.guild.id}.${usuario.id}`, 0)
  let embed = new Discord.MessageEmbed()
  .setTitle('Warneos')
  .addField('Usuario:', `<@${usuario.id}>`)
  .addField('Cantidad de sanciones borradas:', `${warneos}`)
  .setColor('RANDOM')
  message.channel.send({embeds:[embed]});
  return true
  }

if(args[0] === "set"){
  if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply("No tienes permisos para modificar los warns antes de la sanción")
  if(!args[1]) return message.channel.send("Debes establecer un numero maximos de warns antes de ser kikeado");
  const wbk = await warns.get(`${message.guild.id}.kicks`)
  if(isNaN(args[1])) return message.reply("Debes establecer un nuemro, no una letra/un caracter extraño")
  let embed = new Discord.MessageEmbed()
  .setTitle('Warneos')
  .addField('Antiguos avisos antes del kikeo:', `${wbk}`)
  .addField('Nuevos avisos antes del kikeo:', `${args[1]}`)
  .setColor('RANDOM')
  message.channel.send({embeds: [embed]});
  warns.set(`${message.guild.id}.kicks`, `${args[1]}`)
  return true
  }

if(!usuario) return message.channel.send('No has mencionado ningún usuario')
const warnings = await warns.get(`${message.guild.id}.${usuario.id}`)


let razon = args.slice(1).join(' ')
if(!razon) razon = 'Razon no especificada'
if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('No tienes permisos para ejecutar este comando')
if(razon.length > 1024) return message.reply('La razón no puede exceder los 1024 caracteres') 
if(!warns.tiene(`${message.guild.id}.${usuario.id}`)){warns.establecer(`${message.guild.id}.${usuario.id}`, 0)
}

warns.sumar(`${message.guild.id}.${usuario.id}`, 1) 
let embed = new Discord.MessageEmbed()
.setTitle('Usuario advertido')
.addField('Usuario:', `<@${usuario.id}>`)
.addField('Autor de la sanción:', `<@${message.author.id}>`)
.addField('Razón:', razon)
.setColor('RANDOM')
message.channel.send({embeds: [embed]});
usuario.send(`Hola! Vine a informarte que fuiste avisado en el servidor ${message.guild.name} por la razón: ${razon}`).catch(e => e)
const customwarns = await warns.get(`${message.guild.id}.kicks`)
if(warnings >= customwarns){
  if(!message.guild.me.permissions.has("KICK_MEMBERS")) {
    message.reply("No tengo permisos para expulsa usuarios, pero el usuario ya ha alcanzado el máximo de avisos")
    warns.set(`${message.guild.id}.${usuario.id}`,0)
    return true
  }
  message.guild.member(usuario).kick(`Alcanzar ${customwarns} warns`)
  warns.set(`${message.guild.id}.${usuario.id}`, 0)
  message.channel.send("Se ha kikeado al usuario **"+usuario.username+"** por alcanzar **"+warnings+"** warns")
}
}
}