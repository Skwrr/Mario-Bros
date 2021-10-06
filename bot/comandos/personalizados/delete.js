module.exports = {
  name: "delete",
  description: "Rechaza un bot en pruebas", 
  use: "(botid) (reason)", 
  category: "personalizados", 
  alias: [],
  premium: true,
  Custom: "876201162192322572",
  async run(client, message, args) {
    if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` en tu servidor y accede al panel del bot")
    if(!message.member.roles.cache.get("876218437570007040")) return message.reply("No tienes permiso para ejecutar este comando")
    let db = require("megadb")
    db = new db.crearDB("request")
    try{
      if(!client.users.resolve(args[0])) return message.reply("Debes mencionar a un bot")
      let user = db.has("pending."+client.users.resolve(args[0]).id)
      if(!user) return message.reply("Ese bot ya estaba agregado o no está en la lista")
      user = await db.get("pending."+client.users.resolve(args[0]).id)
      if(!args[1]) return message.reply("Falta la razón").then(y => y.delete({timeout: 2500}))
      message.channel.send("Bot rechazado").then(m => m.delete({timeout:3000}))
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
          .setTitle("Bot rechazado!")
          .setDescription("Autor: "+await db.get("pending."+client.users.resolve(args[0]).id+".autor"))
          .addField("Nombre del Bot: ",await db.get("pending."+client.users.resolve(args[0]).id+".name"))
          .addField("Descripción del Bot: ",await db.get("pending."+client.users.resolve(args[0]).id+".descripcion"))
          .addField("Razón: ",args.slice(1).join(" "))
          .setColor("RED")
          .setThumbnail(client.users.resolve(args[0]).displayAvatarURL())
          .setTimestamp()
          .setFooter("Arregle los fallos y vuelva a añadir al bot")
          message.guild.channels.cache.find(e => e.id === "877590072927588392").send({embeds: [embed]})
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
      description: "ID del bot para Rechazar",
      type: "STRING",
      required: true
    },
    {
      name: "reason",
      description: "Razon por la cual se rechaza el bot",
      type: "STRING",
      required: true
    }],
    async run(client, message, args){
      if(message.guild.id !== "876201162192322572") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere `premium` y contacta con mi creador")
      if(!message.member.roles.cache.get("876218437570007040")) return message.reply({content: "No tienes permiso para ejecutar este comando", ephemeral: true})
      let db = require("megadb")
      db = new db.crearDB("request")
      try{
        let user = await db.get("pending."+client.users.resolve(args.getString("botid")).id)
        if(!user) return message.reply({content: "Ese bot ya estaba agregado o no está en la lista", ephemeral: true})
        message.reply({content: "Bot rechazado", ephemeral: true})
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
            .setTitle("Bot rechazado!")
            .setDescription("Autor: "+await db.get("pending."+args.getString("botid")+".autor"))
            .addField("Nombre del Bot: ",await db.get("pending."+args.getString("botid")+".name"))
            .addField("Descripcion: ",await db.get("pending."+args.getString("botid")+".descripcion"))
            .addField("Razón: ", args.getString("reason"))
            .setColor("RED")
            .setThumbnail(args.getString("botid").displayAvatarURL())
            .setTimestamp()
            .setFooter("Arregle los fallos y vuelva a añadir al bot")
            message.guild.channels.cache.find(e => e.id === "877590072927588392").send({embeds: [embed]})
            db.delete(args.getString("botid"))
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