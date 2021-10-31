const Discord = require("discord.js")
const db = require("megadb")
module.exports = async(client, command) => {
  client.commandsran++
  let commande = new db.crearDB("commands")
  commande.add("times", 1)

  let used = 0
  let message = command
  let fs = require("fs")
  if(command.isCommand()){
    let maint = new db.crearDB("maintenance")

    if(await maint.get("status") == "on") return command.reply({content: "El mantenimiento está activado, no puedes ejecutar nungún comando", ephemral: true})
    let args = command.options
    let cmd;
    fs.readdirSync('./bot/comandos/').forEach(dir => {
      if (dir.endsWith('.js')) {
        let fileName = dir.substring(0, dir.length - 3);
        if(command.commandName === fileName) {
          cmd = require(`../comandos/${dir}`)
          if(cmd.premium && cmd.premium === true){
            const gp = new db.crearDB("premium")
            let premium = gp.has(command.guild.id)
            if(!premium) return command.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Premium\`")
          }
          if(cmd.perms){
            if(typeof cmd.perms !== "object") console.log(`${cmd.name} no tiene un Object como propiedad de perms`)
            let perms = cmd.perms
            if(perms.user){
              if(typeof perms.user != "object") console.log(`${cmd.name} no tiene un Array como propiedad de perms.user`)
              if(!message.member.permissions.has(perms.user)) return message.reply({content: "No tienes permisos para ejecutar este comando, necesitas los permisos `"+perms.user.join(" | ")+"`", ephemral: true})
            }
            if(perms.bot){
              if(typeof perms.bot != "object") console.log(`${cmd.name} no tiene un Array como propiedad de perms.bot`)
              if(!message.guild.me.permissions.has(perms.bot)) return message.reply({content: "No tengo permisos para ejecutar este comando, necesito los permisos `"+perms.bot.join(" | ")+"`", ephemeral: true})
            }
            if(perms.owner){
              if(typeof perms.owner != "string") console.log(`${cmd.name} no tiene ua String como propiedad de perms.owner`)
              if(!perms.owner.includes(message.author.id)) return message.reply({content: "❌ **Solo mi Creador puede usar Este cmd** ❌", ephemeral: true})
            }
          }
          let embed = new Discord.MessageEmbed()
          .setTitle("Valora a "+client.user.username)
          .setDescription("Del 1 al 5 como me valorarías")
          .setColor("RANDOM")
          let num = Math.floor(Math.random() * 100)
          if(!used >= 1){
          if(num <= 5) message.channel.send({embeds: [embed]}).then(y => {
            [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣' ].forEach(em => y.react(em))
            let filter = (r,u) => {
              if(u.id !== message.user.id) return
              if(u.bot) return
              embed.setDescription("Gracias por valorarme, has sido el afortunado de obtener este mensaje de un 5% de probabilidad")
              y.channel.send({embeds: [embed]})
              y.delete()
              let valorationdb = require("megadb")
              valorationdb = new valorationdb.crearDB("valoration")
              let value
              if(r.emoji.name === "1️⃣") value = 1
              else if(r.emoji.name === "2️⃣") value = 2
              else if(r.emoji.name === "3️⃣") value = 3
              else if(r.emoji.name === "4️⃣") value = 4
              else if(r.emoji.name === "5️⃣") value = 5
              if(!valorationdb.has("total")) valorationdb.set("total", {
                times: 1, valoration: value
              })
              else {
                valorationdb.sumar("total.times", 1)
                valorationdb.sumar("total.valoration", value)
              }
              return
            }
            y.awaitReactions({filter, time: 30000, errors:['time']}).catch(error => y.edit("Se acabó el tiempo"))
            used++
          })
          }
          try{
            cmd.SlashCommand.run(client, command, args)
          }catch(error){
            (async()=>(await client?.channels?.fetch("878389543458451477")).send({embeds: [new Discord.MessageEmbed().setTitle("Bug Detectado").setColor("RANDOM").setDescription('```js\n'+error+'\n```').setAuthor(message.user.username, message.user.displayAvatarURL()).addField("Comando:", `\`${cmd.name}\``)]}))()
          }
        }
      } else {
        const commands = fs.readdirSync(`./bot/comandos/${dir}`);
        for (let file of commands) {
          if (file.endsWith('.js')) {
            let fileName = file.substring(0, file.length - 3);
            if(command.commandName === fileName) {
              cmd = require(`../comandos/${dir}/${file}`)
              if(cmd.premium && cmd.premium === true){
                const gp = new db.crearDB("premium")
                let premium = gp.has(command.guild.id)
                if(!premium) return command.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Premium\`")
              }
              if(cmd.perms){
                if(typeof cmd.perms !== "object") console.log(`${cmd.name} no tiene un Object como propiedad de perms`)
                let perms = cmd.perms
                if(perms.user){
                  if(typeof perms.user != "object") console.log(`${cmd.name} no tiene un Array como propiedad de perms.user`)
                  if(!message.member.permissions.has(perms.user)) return message.reply({content: "No tienes permisos para ejecutar este comando, necesitas los permisos `"+perms.user.join(" | ")+"`", ephemral: true})
                }
                if(perms.bot){
                  if(typeof perms.bot != "object") console.log(`${cmd.name} no tiene un Array como propiedad de perms.bot`)
                  if(!message.guild.me.permissions.has(perms.bot)) return message.reply({content: "No tengo permisos para ejecutar este comando, necesito los permisos `"+perms.bot.join(" | ")+"`", ephemeral: true})
                }
                if(perms.owner){
                  if(typeof perms.owner != "string") console.log(`${cmd.name} no tiene ua String como propiedad de perms.owner`)
                  if(!perms.owner.includes(message.author.id)) return message.reply({content: "❌ **Solo mi Creador puede usar Este cmd** ❌", ephemeral: true})
                }
              }
              let embed = new Discord.MessageEmbed()
              .setTitle("Valora a "+client.user.username)
              .setDescription("Del 1 al 5 como me valorarías")
              .setColor("RANDOM")
              let num = Math.floor(Math.random() * 100)
              if(!used >= 1){
              if(num <= 5) message.channel.send({embeds: [embed]}).then(y => {
                [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣' ].forEach(em => y.react(em))
                let filter = (r,u) => {
                  if(u.id !== message.user.id) return
                  if(u.bot) return
                  embed.setDescription("Gracias por valorarme, has sido el afortunado de obtener este mensaje de un 5% de probabilidad")
                  y.channel.send({embeds: [embed]})
                  y.delete()
                  let valorationdb = require("megadb")
                  valorationdb = new valorationdb.crearDB("valoration")
                  let value
                  if(r.emoji.name === "1️⃣") value = 1
                  else if(r.emoji.name === "2️⃣") value = 2
                  else if(r.emoji.name === "3️⃣") value = 3
                  else if(r.emoji.name === "4️⃣") value = 4
                  else if(r.emoji.name === "5️⃣") value = 5
                  if(!valorationdb.has("total")) valorationdb.set("total", {
                    times: 1, valoration: value
                  })
                  else {
                    valorationdb.sumar("total.times", 1)
                    valorationdb.sumar("total.valoration", value)
                  }
                  return
                }
                y.awaitReactions({filter, time: 30000, errors:['time']}).catch(error => y.edit("Se acabó el tiempo"))
                used++
              })
              }
              cmd.SlashCommand.run(client, command, args)
            }
          }
        }
      }
    });
  }
}