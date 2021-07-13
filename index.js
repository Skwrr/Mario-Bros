//El primer bot que hice
console.clear()
const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
let app = require("express")
require('dotenv').config();

client.comandos = new Discord.Collection();

const distube = require("distube")
client.distube = new distube(client, {
  emitNewSongonly: true,
  searchSongs: false,
  leaveOnStop: true,
  leaveOnFinish: false,
  leaveOnEmpty: false
})

client.distube.on("addList", (message, playlist) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Nueva \`PlayList\` añadida")
  .setDescription(playlist.name+" | "+playlist.songs.length+" canciones")
  .setFooter(`Añadido por ${message.author.tag}`)
  .setTimestamp()
  .setThumbnail(message.guild.iconURL())
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  .setColor("RANDOM")
  for(let i = 0; i < parseInt(playlist.songs.length)-1; i++){
    embed.addField(playlist.songs[i].name, `${playlist.songs[i].formatedDuration}`)
  }
  message.channel.send(embed)
})

client.distube.on("addSong", (message, song) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Nueva \`Canción\` añadida")
  .setDescription(client.distube.getQueue(message).songs[parseInt(client.distube.getQueue(message).songs.length)-1].name+` | ${song.formattedDuration}`)
  .setFooter(`Añadido por ${message.author.username}`)
  .setTimestamp()
  .setThumbnail(message.guild.iconURL())
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  .setColor("RANDOM")
  message.channel.send(embed)
})

client.distube.on("playSong", (message, song) => {
  message.channel.send("Reproduciendo ahora: **"+client.distube.getQueue(message).songs[parseInt(client.distube.getQueue(message).songs.length)-1].name+"** | "+song.formattedDuration)
})

client.distube.on("playList", (message, playlist) => {
  message.channel.send("Reproduciendo playlist: **"+playlist.name+"**")
})

client.distube.on("error", (message, error) => {
  console.clear()
  console.error(error.message)
  message.channel.send(error.message)
})


function login(t){
  if(!t) t=process.env.TOKEN;
  return client.login(`${t}`)
}
fs.readdirSync('./bot/comandos/').forEach(dir => {
  if(dir.endsWith('.js')){
    let fileName = dir.substring(0, dir.length - 3);

		let fileContents = require(`./bot/comandos/${dir}`);
    
		client.comandos.set(fileName, fileContents);
  }else{
    const commands = fs.readdirSync(`./bot/comandos/${dir}`);
    for(let file of commands){
      if(file.endsWith('.js')){
        let fileName = file.substring(0, file.length - 3);

		    let fileContents = require(`./bot/comandos/${dir}/${file}`);

		    client.comandos.set(fileName, fileContents);
      }
    }
  }
})
for (const file of fs.readdirSync('./bot/eventos/')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);

		let fileContents = require(`./bot/eventos/${file}`);

		client.on(fileName, fileContents.bind(null, client));
	}
}
const keepAlive = require('./webpage/index.js');
const Monitor = require('ping-monitor');

let host = [
  'https://Host.sergioesquina.repl.co/',
  'https://sepoxcraft48yt-premium.sergioesquina.repl.co/'
]

let monitor;

keepAlive();
host = host.forEach(async(id) => {
  monitor = new Monitor({
	  website: id,
	  title: 'host',
	  interval: 5 // minutes
  });



  monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
  monitor.on('down', (res) =>
	console.log(`${res.website} se ha caído - ${res.statusMessage}`));
  monitor.on('stop', (website) => console.log(`${website} se ha parado.`));
  monitor.on('error', (error) => console.error(error));
})

login()
	.then(() => {
		console.log(`Estoy listo, soy ${client.user.tag}`);
	})
	.catch(err => {
		console.error('Error al iniciar sesión: ' + err);
	});