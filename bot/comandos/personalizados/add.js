module.exports = {
  name: "add",
  description: "Acepta un bot en pruebas", 
  use: "(@bot)", 
  category: "personalizados", 
  alias: [], 
  async run(client, message, args) {
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` y contacta con mi creador")
    if(!message.member.roles.cache.get("876218437570007040")) return message.reply("No tienes permiso para ejecutar este comando")
    let db = require("megadb")
    db = new db.crearDB("request")
    try{
      message.delete()
      if(!message.mentions.members.first()) return message.reply("Debes mencionar a un bot")
      let user = await db.get(message.mentions.users.first().id)
      if(!user) return message.reply("Ese bot ya estaba agregado o no está en la lista")
      message.channel.send("Bot aceptado").then(m => m.delete({timeout:3000}))
      /*message.author.send("Como se llama su bot?").then(m => {
      message.channel.send("Mira tus MD")
      m.channel.awaitMessages((msg,u) => {
        if(u.bot) return
        arr.push(msg)
      },{max:1}).then(() => {
        m.channel.send("Cuál es su invitación?")
        m.channel.awaitMessages((msg, u)=>{
          if(u.bot) return
          arr.push(msg)
        },{max:1}).then(() => {
        m.channel.send("Listo, su bot ahora está en espera").then(() =>{*/
          let Discord = require("discord.js")
          let embed = new Discord.MessageEmbed()
          .setTitle("Bot aceptado!")
          .setDescription("Autor: "+await db.get(message.mentions.members.first().id+".autor"))
          .addField("Nombre del Bot: ",await db.get(message.mentions.members.first().id+".name"))
          .addField("Invitación del Bot: ",await db.get(message.mentions.members.first().id+".invite"))
          .setColor("RANDOM")
          .setThumbnail(message.mentions.users.first().displayAvatarURL())
          .setTimestamp()
          .setFooter("Solo disponible en el canal de "+message.guild.channels.resolve("876216078542471168"))
          message.guild.channels.cache.find(e => e.id === "877590072927588392").send(embed)
          db.delete(message.mentions.users.first().id)
          message.mentions.members.first().roles.add("877603621720707093")
          /*
        }) 
        }) 
        })
    })*/
    }catch(error) {
      message.channel.send(error.message)
    }
  }
}