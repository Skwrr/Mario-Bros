module.exports = async(client, message) => {
  let prefix
  if(message.channel.type == 'DM'){
    prefix = `k!`
    if(message.content.startsWith(prefix)){
      message.channel.send("No puedo ejecutar ningun comando en md, mi prefix predeterminado es `k!`")
    return true
    }
    return true
  }
  if(!message.channel.sendEmbed) message.channel.sendEmbed = function se(embed) {
    if (!embed) throw new TypeError("No se puede enviar un embed vacío")
    return message.channel.send({embeds: [embed]})
  }

  

  const db = require("megadb");
  let prefixdb = new db.crearDB("prefixes")
  let counting = new db.crearDB("counting")
  let blg = new db.crearDB("blacklistglobal")

  if(client.distube.getQueue(message.guildId)){
    if(client.distube.getQueue(message.guildId).autoplay === true) client.distube.toggleAutoplay(message)
  }
  

  prefix = prefixdb.tiene(message.guild.id) ? await prefixdb.obtener(message.guild.id) : "k!"

//Args y command
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let commandName = args.shift();
  
  const Discord = require("discord.js");

//Cosas


  if (message.author.bot) return;
  if(!message.content.toLowerCase().startsWith(prefix)){
    if(message.mentions.users.first()){
    if(message.mentions.users.first().id === client.user.id && !message.reference) return message.reply("Mi prefix en este servidor es `"+prefix+"`")
    }
  /*if(message.content.toLowerCase().startsWith('sepox')){
    message.channel.send('SEPOXCRAFT48? El que busca gente que le ayude y todos le ignoran?')
  }
  if(message.content.toLowerCase().startsWith('shiro')){
    message.channel.send('Shiro? El pibe que REVIENTA los oidos a todo el mundo en llamada?')
  }
  if(message.content.toLowerCase().startsWith('panda')){
    message.channel.send('pandaelxd? El pibe que hace buen pebepe?')
  }
  if(message.content.toLowerCase().startsWith('csillo')){
    message.channel.send('QUE QUIERES DE CSILLO')
    setTimeout(() => {
      message.channel.send("NO MOLESTES AL DEVELOPER DEL SERVER CTM")
    }, 5000)
  }
  if(message.content.toLowerCase().startsWith('guga') || message.content.toLowerCase().startsWith('guga')){
    message.channel.send('gugaliz? Que queres de el, no toques al mejor amigo de SEPOX')
  }*///Userphone :facherismo:
  if (message.channel.name == "userphone") {
    if(message.content.startsWith(prefix)){

    message.channel.send("Aqui no puedes escribir ningun comando").then(m => setTimeout(() => m.delete(), 4000))
    return message.delete()
    }
    message.delete();
    prefix = ''
  }
  args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  commandName = args.shift();
  let canal = client.channels.cache.filter(c => c.name == "userphone");

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setFooter(message.guild.name)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(commandName+' '+args.join(' '))
      .setColor("RANDOM");

    const array = [
      "discord.gg",
      "discord.me",
      "discord.io/",
      "discordapp.com/invite",
      "https:",
      ".com",
      ".net"
    ];

    if (message.channel.name == "userphone") {

      if (array.some(word => message.content.toLowerCase().includes(word))) {

        message
          .reply("No se permiten invitaciones en este servidor.")
          .then(response => {
            setTimeout(() => response.delete(), 5000)
          });

      } else {

        canal.forEach(m => {
          client.channels.cache.get(m.id).send({embeds: [embed]});
        }); 
      } 
    }
    if(counting.has(message.guild.id)){
      if(message.channel.id !== counting.get(`${message.guild.id}.channel`)) return
      if(message.content !== counting.get(`${message.guild.id}.count`)) return message.delete();
      counting.sumar(`${message.guild.id}.count`, 1)
    }


  

    return
  }

  
  
  //Obtener comandos

  let cmd = client.comandos.get(commandName.toLowerCase()) || client.comandos.find(cmd => cmd.alias && cmd.alias.includes(commandName.toLowerCase()))
  if(commandName === '') return
  if (!cmd) return message.reply('**No existe ese comando, puedes sugerirlo con el comando `'+prefix+'request`**')
  if(new db.crearDB("blacklistglobal").has(message.author.id)) return message.reply("Estas en la lista negra de los comandos, no intentes recuperar el derecho a usarme")
  if(cmd){
    const { MessageEmbed } = require("discord.js")
    if(cmd.premium && cmd.premium === true){
      const gp = new db.crearDB("premium")
      let premium = gp.has(message.guild.id)
      if(!premium) return message.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Premium\`")
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Valora a "+client.user.username)
    .setDescription("Del 1 al 5 como me valorarías")
    .setColor("RANDOM")
    let num = Math.floor(Math.random() * 100)
    if(num <= 5) message.channel.send({embeds: [embed]}).then(y => {
      [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣' ].forEach(em => y.react(em))
      let filter = (r,u) => {
        if(u.id !== message.author.id) return
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
    }catch(error) {
      console.log(error.stack)
    }
  }
}