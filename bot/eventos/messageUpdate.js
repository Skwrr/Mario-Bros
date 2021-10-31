module.exports = async(client, oldMessage, newMessage) => {
  let message = newMessage
  let prefix = require("megadb"), db = require("megadb")
  prefix = new prefix.crearDB("prefixes")
  prefix = prefix.has(newMessage.guild.id) ? await prefix.get(newMessage.guild.id) : "k!"
  if(oldMessage.content == newMessage.content || !newMessage.content.toLowerCase().startsWith(prefix)) return

  let args = newMessage.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let commandName = args.shift();

  let cmd = client.comandos.get(commandName.toLowerCase()) || client.comandos.find(cmd => cmd.alias && cmd.alias.includes(commandName.toLowerCase()))
  let maint = new db.crearDB("maintenance")
  if(await maint.get("status") == "on") return newMessage.reply("El mantenimiento está activado, no puedes ejecutar ningún comando")
  if(commandName === '') return
  if (!cmd) return newMessage.reply('**No existe ese comando, puedes sugerirlo con el comando `'+prefix+'request`**')
  if(new db.crearDB("blacklistglobal").has(newMessage.author.id)) return newMessage.reply("Estas en la lista negra de los comandos, no intentes recuperar el derecho a usarme")
  if(cmd){
    const Discord = require("discord.js")
    let command = new db.crearDB("commands")
    if(cmd.premium && cmd.premium === true){
      const gp = new db.crearDB("premium")
      let premium = gp.has(newMessage.guild.id)
      
      if(!premium) return newMessage.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Premium\`")
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Valora a "+client.user.username)
    .setDescription("Del 1 al 5 como me valorarías")
    .setColor("RANDOM")
    let num = Math.floor(Math.random() * 100)
    if(num <= 5) newMessage.channel.send({embeds: [embed]}).then(y => {
      [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣' ].forEach(em => y.react(em))
      let filter = (r,u) => {
        if(u.id !== newMessage.author.id) return
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
    })
    try{
      cmd.run(client, message, args, db, Discord)
      client.commandsran++
      command.add("times", 1)
    }catch(error) {
      client.commandsran++
      command.add("times", 1)
      console.error(error)
      (async(error)=>(await client?.channels?.fetch("878389543458451477")).send({embeds: [new Discord.MessageEmbed().setTitle("Bug Detectado").setColor("RANDOM").setDescription('```js\n'+error+'\n```').setAuthor(message.author.username, message.author.displayAvatarURL()).addField("Comando:", `\`${cmd.name}\``)]}))()
    }
  }
}