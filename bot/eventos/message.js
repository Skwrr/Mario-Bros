module.exports = async(client, message) => {
  let prefix
  if(message.channel.type == 'dm'){
    prefix = `hp`
    if(message.content.startsWith(prefix)){
      message.channel.send("No puedo ejecutar ningun comando en md, mi prefix predeterminado es `hp`")
    return true
    }
    return true
  }
  

  const db = require("megadb");
  let prefixdb = new db.crearDB("prefixes")
  let blg = new db.crearDB("blacklistglobal")



  

  prefix = prefixdb.tiene(message.guild.id) ? await prefixdb.obtener(message.guild.id) : "hp"

//Args y command
  let args = message.content.toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let command = args.shift();
  
  const Discord = require("discord.js");

//Cosas


  if (message.author.bot) return;
  if(!message.content.toLowerCase().startsWith(prefix)){
    if(message.content.toLowerCase().startsWith('zerok')){
    message.channel.send('ZerokMortal? El pvto que dejó morir HypnoCraft?')
  } 
  if(message.content.toLowerCase().startsWith('sepox')){
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
  }//Userphone :facherismo:
  if (message.channel.name == "userphone") {
    message.delete();
    prefix = ''
  }
  args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  command = args.shift();
  let canal = client.channels.filter(c => c.name == "userphone");

    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setFooter(message.guild.name)
      .setThumbnail(message.author.avatarURL)
      .setDescription(command+' '+args.join(' '))
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
            response.delete(5000);
          });

      } else {

        canal.forEach(m => {
          client.channels.get(m.id).send(embed);
        }); 
      } 
    } 
    
    if (!message.channel.name == "userphone") return;

return
  }

  
  
  //Obtener comandos
  let cmd = client.comandos.get(command);
  if(command === '') return message.reply('Escribe `hphelp` para ver todos mis comandos')
  if (!cmd) return message.reply('**No existe ese comando, pero puedes sugerirlo contactando con mi dueño ;)**')
  
  cmd(client, message, args, Discord)
};