module.exports = {
  name: "addbot", 
  description: "Añade tu bot a mi servidor de soporte", 
  use: "(bot name) | (botid) | (invite) | (descripcion) | [nota personal]", 
  category: "personalizados", 
  alias: ["añadir-bot"],
  premium: true,
  Custom: "876201162192322572",
  async run(client, message, args) {
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
    let db = require("megadb")
    db = new db.crearDB("request")
    try{
      let sep = args.join(" ").split(" | ")
      if(!sep[3]) return message.reply("Debes escribir el nombre de su Bot, su id, su invitación y una nota personal separado por un |").then(m => setTimeout(() => m.delete(),2500))
      if(db.has(sep[1])) return message.reply("Ya has agregado a ese bot, espere a que lo revisen")
      message.channel.send("Listo, su Bot está en espera.").then(m => setTimeout(() => m.delete(), 3000))
      message.delete()
      /*message.user.send("Como se llama su bot?").then(m => {
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
          db.set("pending."+sep[1], {
              autor: message.author.username,
              invite: sep[2],
              name: sep[0],
              descripcion: sep[3]
            })
          let Discord = require("discord.js")
          let embed = new Discord.MessageEmbed()
          .setTitle("Nuevo Bot!")
          .setAuthor(message.user.username, message.user.displayAvatarURL())
          .addField("Nombre del Bot: ",sep[0])
          .addField("Id del Bot: ",sep[1])
          .addField("Descripción: ", sep[3])
          .setColor("RANDOM")
          .setThumbnail(message.user.displayAvatarURL())
          .setTimestamp()
          .setFooter("/add (botid) | /delete (botid) (reason)")
          message.guild.channels.cache.find(e => e.id === "877590072927588392").send({content: `${message.guild.roles.resolve("876218437570007040")}`, embeds: [embed]})
          message.guild.channels.cache.find(e => e.id == "894246665047904356").send({content: `${message.guild.roles.resolve("876218437570007040")}`, embeds: [embed
          .addField("Invitación del Bot: ",sep[2])
          .addField("Nota personal: ",sep[4])]})/*
        }) 
        }) 
        })
    })*/
    }catch(error) {
      message.channel.send(error.message)
    }
  },
  SlashCommand: {
    options: [{
      name: "botname",
      description: "Nombre del bot",
      type: "STRING",
      required: true
    },
    {
      name: "botid",
      description: "ID del bot",
      type: "STRING",
      required: true
    },
    {
      name: "invite",
      description: "Invitación del bot",
      type: "STRING",
      required: true
    },
    {
      name: "descripcion",
      description: "Descripción del bot",
      type: "STRING",
      required: true
    },
    {
      name: "personal",
      description: "Nota personal",
      type: "STRING",
      required: false
    }
    ],
    async run(client, message, args){
      if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` y contacta con mi creador")
      let db = require("megadb")
      db = new db.crearDB("request")
      try{
        let sep = [
          args.getString("botname"),
          args.getString("botid"),
          args.getString("invite"),
          args.getString("personal"),
          args.getString("descripcion")
        ]
        if(db.has("pending."+sep[1])) return message.reply({content:"Ya has agregado a ese bot, espere a que lo revisen", ephemeral: true})
        message.reply({content: "Listo, su Bot está en espera.", ephemeral: true})
        /*message.user.send("Como se llama su bot?").then(m => {
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
            db.set("pending."+sep[1], {
              autor: message.user.username,
              invite: sep[2],
              name: sep[0],
              descripcion: sep[4]
            })
            let Discord = require("discord.js")
            let embed = new Discord.MessageEmbed()
            .setTitle("Nuevo Bot!")
            .setAuthor(message.user.username, message.user.displayAvatarURL())
            .addField("Nombre del Bot: ",sep[0])
            .addField("Id del Bot: ",sep[1])
            .addField("Descripción: ", sep[4])
            embed.setColor("RANDOM")
            embed.setThumbnail(message.user.displayAvatarURL())
            embed.setTimestamp()
            embed.setFooter("/add (botid) | /delete (botid) (reason)")
            message.guild.channels.cache.find(e => e.id === "877590072927588392").send({content: `${message.guild.roles.resolve("876218437570007040")}`, embeds: [embed]})
            message.guild.channels.cache.find(e => e.id == "894246665047904356").send({content: `${message.guild.roles.resolve("876218437570007040")}`, embeds: [embed
            .addField("Invitación del Bot: ",sep[2])
            .addField("Nota personal: ",sep[3]) || "Nada"]})/*
          }) 
          }) 
          })
      })*/
      }catch(error) {
        message.channel.send(error.message)
      }
    }
  }
}