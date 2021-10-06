module.exports = {
  name: "backup",
  description: "Administra los respaldos de tu servidor",
  use: "(create/info/load/delete/staffrole) (backupcode)",
  alias: [],
  category: "beta",
  async run(client, message, args){
    message.channel.send("Este comando es un SlashCommand, puedes volver a invitar al bot si no ves los SlashCommand")
    require("../ayuda/invite").run(client, message)
  },
  SlashCommand: {
    options: [
      {
        name: "action",
        required: true,
        description: "Create/Info/Load/Delete/Staffrole",
        type: "STRING"
      },
      {
        name: "backupid",
        required: false,
        description: "ONLY WORKS BY INFO, LOAD, DELETE AND STAFFROLE",
        type: "STRING"
      }
    ],
    async run(client, message, args){
      let db = require("megadb")
      if(args.getString("action") === "create"){
        let staffRole = new db.crearDB("backupconfig")
        staffRole = await staffRole.get(message.guild.id)
        if(staffRole == "ADMINISTRATOR") {
          let Permissions = require("discord.js").Permissions
          if(!new Permissions(message.guild.members.resolve(message.user.id).permissions).has(staffRole)) return message.reply({content: "No tienes permisos", ephemeral: true})
        }else
        if(message.guild.members.resolve(message.user.id).roles){
          if(!message.guild.members.resolve(message.user.id).roles.cache.find(e => e.name == staffRole))
          return message.reply({content: "No tienes permisos", ephemeral: true})
        }else return message.reply({content: "No tienes permisos", ephemeral: true})
        message.reply({content: "Creando BackUP...", ephemeral: true})
        let backup = require("discord-backup")
        backup.setStorageFolder(__dirname+"/../../backups")
        backup.create(message.guild, {
          maxMessagesPerChannel: 10,
          jsonSave: true,
          jsonBeautify: true,
          doNotBackup: ["bans"],
          saveImages: "base64"
        }).then(backupInfo => {
          message.user.send({content: `Listo! Ahora puedes cargar este respaldo en otro servidor con el codigo: ${backupInfo.id}`})
        })
      }else
      if(args.getString("action") === "info"){
        let id = args.getString("backupid")
        if(!id) return message.reply({content: "Falta la id de respaldo", ephemeral: true})
        let backup = require("discord-backup")
        backup.setStorageFolder(__dirname+"/../../backups")
        let Discord = require("discord.js")
        let embed = new Discord.MessageEmbed()
        .setTitle("Informacion de Respaldo")
        .setColor("RANDOM")
        message.reply({content: "Obteniendo informacion...", ephemeral: true})
        backup.fetch(id).then(backupInfo => {
          if(backupInfo === "No backup found") return message.channel.send({content: "No se ha encontrado esa id"})
          let arr = {
            text: [],
            voice: [],
            news: [],
            category: [],
            others: [],
          }
          for(let i = 0; i < backupInfo.data.channels.categories.map(e => e.name).length; i++){
            let channelc = backupInfo.data.channels.categories.map(e => e.name)[i]
            for(let i2 = 0; i2 < backupInfo.data.channels.categories.map(e => e.children)[i].length; i2++){
              if(i>1000) return process.reload()
              let channelType = backupInfo.data.channels.categories.map(e => e.children.map(a => a.type)[i2])[i],
              channel = backupInfo.data.channels.categories.map(e => e.children.map(a => a.name)[i2])[i]
              let etype
              if(channelType == "GUILD_TEXT") etype = "[📃] "
              else
              if(channelType == "GUILD_VOICE") etype = "[🎙] "
              else
              if(channelType == "GUILD_NEWS") etype = "[📡] "
              else etype = "[❔] "


              if(channelType == "GUILD_TEXT") arr.text.push("[📃] "+channel)
              else
              if(channelType == "GUILD_VOICE") arr.voice.push("[🎙] "+channel)
              else
              if(channelType == "GUILD_NEWS") arr.news.push("[📡] "+channel)
              else arr.others.push(etype+channel)
            }
            arr.category.push("[📂] "+channelc)
          }
          for(let i = 0; i < backupInfo.data.channels.others.map(e => e).length; i++){
            let others = backupInfo.data.channels.others.map(e => e.name)[i]
            if(others) arr.others.push("[❔] "+others)
          }
          embed.addField("Roles: ","```\n"+ backupInfo.data.roles.map(e => e.name).join("\n")+"\n```")
          embed.addField("Categorías: ", "```\n"+ arr.category.join("\n")+"\n```", true)
          embed.addField("Canales de Texto: ", "```\n"+arr.text.join("\n")+"\n```", true)
          embed.addField("Canales de Voz: ", "```\n"+arr.voice.join("\n")+"\n```", true)
          embed.addField("Canales de Noticias: ", "```\n"+arr.news.join("\n")+"\n```", true)
          embed.addField("Otros: ", "```\n"+arr.others.join("\n")+"\n```", true)
          message.channel.send({content: null, embeds: [embed]})
        })
      }else
      if(args.getString("action") === "load"){
        let staffRole = new db.crearDB("backupconfig")
        staffRole = await staffRole.get(message.guild.id)
        if(staffRole == "ADMINISTRATOR") {
          let Permissions = require("discord.js").Permissions
          if(!new Permissions(message.guild.members.resolve(message.user.id).permissions).has(staffRole)) return message.reply({content: "No tienes permisos", ephemeral: true})
        }else
        if(message.guild.members.resolve(message.user.id).roles){
          if(!message.guild.members.resolve(message.user.id).roles.cache.find(e => e.name == staffRole))
          return message.reply({content: "No tienes permisos", ephemeral: true})
        }else return message.reply({content: "No tienes permisos", ephemeral: true})

        let id = args.getString("backupid")
        if(!id) return message.reply({content: "Falta la id de respaldo", ephemeral: true})
        let backup = require("discord-backup")
        backup.setStorageFolder(__dirname+"/../../backups")
        let data = await backup.fetch(id)
        if(data === "No backup found") return message.reply({content: "No se ha encontrado esa id", ephemeral: true})
        message.reply({content: "Cargando...", ephemeral: true})
        backup.load(id, message.guild)
      }else
      if(args.getString("action") === "delete"){
        let id = args.getString("backupid")
        let backup = require("discord-backup")
        backup.setStorageFolder(__dirname+"/../../backups")
        let data = await backup.fetch(id)
        if(data === "No backup found") return message.reply({content: "No se ha encontrado esa id", ephemeral: true})
        message.reply({content: "Se ha eliminado el respaldo "+id, ephemeral: true})
        backup.delete(id)
      }else 
      if(args.getString("action") == "staffrole"){
        let id = args.getString("backupid"),
        backup = require("discord-backup"),
        config = new db.crearDB("backupconfig"),
        staffRole = await config.get(message.guild.id)
        backup.setStorageFolder(__dirname+"/../../backups")
        if(!staffRole) config.set(message.guild.id, "ADMINISTRATOR")
        if(staffRole == "ADMINISTRATOR") {
          let Permissions = require("discord.js").Permissions
          if(!new Permissions(message.guild.members.resolve(message.user.id).permissions).has(staffRole)) return message.reply({content: "No tienes permisos", ephemeral: true})
        }else
        if(message.guild.members.resolve(message.user.id).roles){
          if(!message.guild.members.resolve(message.user.id).roles.cache.find(e => e.name == staffRole))
          return message.reply({content: "No tienes permisos", ephemeral: true})
        }else return message.reply({content: "No tienes permisos", ephemeral: true})
        if(id){
          let role = message.guild.roles.resolve(id)
          if(!role) return message.reply("Ese rol no existe")
          config.set(message.guild.id, role.name)
          message.reply("Rol establecido correctamente")
        }
        if(staffRole == "ADMINISTRATOR") return message.reply("Actualmente, se necesita el permiso de ADMINISTRATOR para crear y cargar respaldos, puedes cambiarlo colocando la id de un rol")
        else message.reply("Actualmente, se necesita el rol "+staffRole+" para crear y cargar respaldos, puedes cambiarlo colocando la id de un rol")
      }else message.reply({content: "Ese argumento es invalido", ephemeral: true})
    }
  }
}