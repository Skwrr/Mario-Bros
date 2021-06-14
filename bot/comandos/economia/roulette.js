module.exports = {
  name: "roulette",
  description: "Apuesta para ganar el cuatro veces mas",
  use: "(ammount)",
  category: 'economia',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")

  const db = require('megadb') 

  const dinero = new db.crearDB("economy")
  let user = message.author; 
  let mor = args[0];
  let gan = mor * 4;

 const din = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL()) 
  .setDescription("Debes poner una cantidad de dinero para apostar.\nEl mínimo de dinero para apostar es de **100** <a:dollar:768550312604336188>") 
  .setColor("RED")

 if(!mor) return message.channel.send(din)
 
const minimo = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL())
  .setDescription("No puedes apostar menos de **100** <a:dollar:768550312604336188> ")
  .setColor("RED")

  if(mor <= 99) return message.channel.send(minimo) 

 if(!dinero.tiene(`${user.id}`)){
   dinero.establecer(`${user.id}.cash`, 0)
   dinero.establecer(`${user.id}.bank`, 0) 
 }
   let money = await dinero.obtener(`${user.id}.cash`); 

  if(isNaN(mor)){
      const nonum = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL())
      .setDescription(`Solo puedes apostar dinero.`) 
      .setColor("RED")
      message.channel.send(nonum) 

      return; 
  }

  if(mor > money){ 
      const nomo = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL())
      .setDescription("No tienes suficiente dinero.") 
      .setColor("RED")
      message.channel.send(nomo)

      return; 
} 

  let co = args[1]; 
 
if(!co){ 
const color = new Discord.MessageEmbed() 
.setAuthor(user.username, message.author.displayAvatarURL())
.setDescription(":duck: Debes elegir un color entre `rojo` o `negro`")
.setColor("RED")

message.channel.send(color)
}
 else if(co === "rojo" || co === "negro"){
 var cro = ["rojo","negro"] 
 var cros = Math.floor(Math.random()*(cro.length)); 
 var crosi = cro[cros]
 if(crosi === "rojo"){ 
if(co === "rojo"){ 

 if(dinero.tiene(`${user.id}`)) 
   dinero.sumar(`${user.id}.cash`, gan)

  const ganaste = new Discord.MessageEmbed() 
  .setAuthor(user.username, message.author.displayAvatarURL())
  .setDescription(`La bola cayó en el color **rojo**\n\nDinero ganado: **${gan}** <a:dollar:768550312604336188>`)
  .setColor("#FFFDFD")

return message.channel.send(`<@${message.author.id}>`), message.channel.send(ganaste)
}

 if(dinero.tiene(`${user.id}`)) 
   dinero.restar(`${user.id}.cash`, mor) 

const perdiste = new Discord.MessageEmbed()
.setAuthor(user.username, message.author.displayAvatarURL())
.setDescription(`La bola cayó en el color **rojo**\n\nDinero perdido: **${mor}** <a:dollar:768550312604336188>`)
.setColor("RED")

message.channel.send(perdiste) 

return; 
}
  
if(crosi === "negro"){
if(co === "negro"){ 

 if(dinero.tiene(`${user.id}`)) 
   dinero.sumar(`${user.id}.cash`, gan)

  const ganaste2 = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL())
  .setDescription(`La bola cayó en el color **negro**\n\nDinero ganado: **${gan}** <a:dollar:768550312604336188>`)
  .setColor("#FFFDFD")
  
return message.channel.send(ganaste2) 
}
 if(dinero.tiene(`${user.id}`)) 
   dinero.restar(`${user.id}.cash`, mor)


const perdiste2 = new Discord.MessageEmbed()
.setAuthor(user.username, message.author.displayAvatarURL())
.setDescription(`La bola cayó en el color **negro**\n\nDinero perdido: **${mor}** <a:dollar:768550312604336188>`)
.setColor("RED")

message.channel.send(perdiste2)

return; 
}

}
  else { 
    const solop = new Discord.MessageEmbed()
    .setAuthor(user.username, message.author.displayAvatarURL())
    .setDescription("Solo puedes poner `rojo` o `negro`.") 
    .setColor("RED")

    message.channel.send(solop)

}
 
}
}