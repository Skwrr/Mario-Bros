module.exports = {
  name: "addbot", 
  description: "Añade tu bot a mi servidor de soporte", 
  use: "(bot name) | (invite)", 
  category: "personalizados", 
  alias: ["añadir-bot"], 
  async run(client, message, args) {
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` y contacta con mi creador")
    let db = require("megadb")
    db = new db.crearDB("request")
    try{
      let sep = args.join(" ").split(" | ")
      message.delete()
      if(db.has(sep[1])) return message.reply("Ya has agregado a ese bot, espere a que lo revisen")
      if(!sep[3]) return message.reply("Debes escribir el nombre de su Bot, su id, su invitación y una nota personal separado por un |").then(m => m.delete({timeout:2500}))
      message.channel.send("Listo, su Bot está en espera.").then(m => m.delete({timeout:3000}))
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
          db.set(sep[1]+".autor", message.author.username)
          db.set(sep[1]+".invite", sep[2])
          db.set(sep[1]+".name", sep[0])
          let Discord = require("discord.js")
          let embed = new Discord.MessageEmbed()
          .setTitle("Nuevo Bot!")
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .addField("Nombre del Bot: ",sep[0])
          .addField("Id del Bot: ",sep[1])
          .addField("Invitación del Bot: ",sep[2])
          .addField("Nota personal: ",sep[3])
          .setColor("RANDOM")
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp()
          .setFooter("mb.add (@bot) | mb.delete (@bot)")
          message.guild.channels.cache.find(e => e.id === "877590072927588392").send(`${message.guild.roles.resolve("876218437570007040")}`, {embed: embed})/*
        }) 
        }) 
        })
    })*/
    }catch(error) {
      message.channel.send(error.message)
    }
  }
}