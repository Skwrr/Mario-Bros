module.exports = {
  name: "add",
  description: "Acepta un bot en pruebas", 
  use: "(botid)", 
  category: "personalizados", 
  premium: true,
  alias: [],
  Custom: "876201162192322572",
  async run(client, message, args) {
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
    if(!message.member.roles.cache.get("876218437570007040")) return message.reply("No tienes permiso para ejecutar este comando")
    let db = require("megadb")
    db = new db.crearDB("request")
    try{
      if(!client.users.resolve(args[0])) return message.reply("Debes mencionar a un bot")
      let user = await db.get("pending."+client.users.resolve(args[0]).id)
      if(!user) return message.reply("Ese bot ya estaba agregado o no está en la lista")
      message.channel.send("Bot aceptado").then(m => setTimeout(() => m.delete(), 5000))
      message.delete()
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
          .setDescription("Autor: "+await db.get("pending."+client.users.resolve(args[0]).id+".autor"))
          .addField("Nombre del Bot: ",await db.get("pending."+client.users.resolve(args[0]).id+".name"))
          .addField("Descripcion: ",await db.get("pending."+client.users.resolve(args[0]).id+".descripcion"))
          .setColor("RANDOM")
          .setThumbnail(client.users.resolve(args[0]).displayAvatarURL())
          .setTimestamp()
          .setFooter("Solo disponible en el canal de "+message.guild.channels.resolve("876216078542471168"))
          message.guild.channels.cache.find(e => e.id === "877590072927588392").send({embeds: [embed]})
          db.set("approved."+client.users.resolve(args[0]).id, await db.get("pending."+client.users.resolve(args[0]).id))
          db.set("approved."+client.users.resolve(args[0]).id+".id", args[0])
          db.set("approved."+client.users.resolve(args[0]).id+".id", client.users.resolve(args[0]).displayAvatarURL({format: "png"}))
          message.guild.members.resolve(args[0]).roles.add("877603621720707093")
          db.delete("pending."+client.users.resolve(args[0]).id)
          /*
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
      name: "botid",
      description: "ID del bot para Aprobar",
      type: "STRING",
      required: true
    }],
    async run(client, message, args){
      if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` y contacta con mi creador")
      if(!message.member.roles.cache.get("876218437570007040")) return message.reply({content: "No tienes permiso para ejecutar este comando", ephemeral: true})
      let db = require("megadb")
      db = new db.crearDB("request")
      try{
        if(!client.users.resolve(args.getString("botid"))) return message.reply({content: "Eso no es una id válida", ephemeral: true})
        let user = await db.get("pending."+client.users.resolve(args.getString("botid")).id)
        if(!user) return message.reply({content: "Ese bot ya estaba agregado o no está en la lista", ephemeral: true})
        message.reply({content: "Bot aceptado", ephemeral: true})
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
            .setDescription("Autor: "+await db.get("pending."+client.users.resolve(args.getString("botid")).id+".autor"))
            .addField("Nombre del Bot: ",await db.get("pending."+client.users.resolve(args.getString("botid")).id+".name"))
            .addField("Descripción: ",await db.get("pending."+client.users.resolve(args.getString("botid")).id+".descripcion"))
            .setColor("RANDOM")
            .setThumbnail(client.users.resolve(args.getString("botid")).displayAvatarURL())
            .setTimestamp()
            .setFooter("Solo disponible en el canal de "+message.guild.channels.resolve("876216078542471168"))
            message.member.guild.channels.cache.find(e => e.id === "877590072927588392").send({embeds: [embed]})
            db.set("approved."+client.users.resolve(args.getString("botid")).id, await db.get("pending."+client.users.resolve(args.getString("botid")).id))
            db.set("approved."+client.users.resolve(args.getString("botid")).id+".id", args.getString("botid"))
            db.set("approved."+client.users.resolve(args.getString("botid")).id+".imageurl", client.users.resolve(args.getString("botid")).displayAvatarURL({format: "png"}))
            db.delete("pending."+client.users.resolve(args.getString("botid")).id)
            message.member.guild.members.resolve(args.getString("botid")).roles.add("877603621720707093")
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
}