//El primer bot que hice
console.clear();
function getWebsites(){
  let db = require("megadb")
  let mdb = new db.crearDB("hosts")
  let arreglo, arr = []
  mdb.map(false, x => arreglo = x)
  arreglo.forEach(e =>
    arr.push(e)
  )
  return arr
}

global.websites = getWebsites()
process.reload = function reload(){
  setTimeout(() => process.exit(), 1500)
  return console.log("[BOT Logs] Reloading")
}
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: '32767',
  allowedMentions: {
    parse: ["users","roles"],
    repliedUser: true
  }
});
let fs = require('fs');
let app = require('express');
require('dotenv').config();
require('moment-duration-format')

const { GiveawaysManager } = require('discord-giveaways')
let gmanager = new GiveawaysManager(client, {
  forceUpdateEvery: 17000,
  endedGiveawaysLifetime: 120000,
  default: {
    botsCanWin: false,
    embedColorEnd: "#FF000",
    embedColor: '#000000'
  }
}, true)

client.comandos = new Discord.Collection();
client.giveaways = gmanager

const {DisTube: distube} = require('distube');
client.distube = new distube(client, {
	searchSongs: 0,
	leaveOnStop: true,
	leaveOnFinish: false,
	leaveOnEmpty: false
});

client.distube.on('addList', (queue, playlist) => {
	const embed = new Discord.MessageEmbed()
		.setTitle('Nueva `PlayList` añadida')
		.setDescription(
			playlist.name + ' | ' + playlist.songs.length + ' canciones'
		)
		.setFooter(`Añadido por ${song.user.tag}`)
		.setTimestamp()
		.setThumbnail(song.member.guild.iconURL())
		.setAuthor(
			song.user.tag,
			song.user.displayAvatarURL({ dynamic: true, size: 1024 })
		)
		.setColor('RANDOM');
	for (let i = 0; i < parseInt(playlist.songs.length) - 1; i++) {
		embed.addField(
			playlist.songs[i].name,
			`${playlist.songs[i].formatedDuration}`
		)
	}
	queue.textChannel.send({embeds: [embed]});
});

client.distube.on('addSong', (queue, song) => {
  console.log(queue)
	const embed = new Discord.MessageEmbed()
		.setTitle('Nueva `Canción` añadida')
		.setDescription(
			`${song.name} | ${song.formattedDuration}`
		)
		.setFooter(`Autor de la cnación ${song.user.username}`)
		.setTimestamp()
		.setThumbnail(song.member.guild.iconURL())
		.setAuthor(
			song.user.tag,
			song.user.displayAvatarURL({ dynamic: true, size: 1024 })
		)
		.setColor('RANDOM');
	queue.textChannel.send({embeds: [embed]});
});

client.distube.on('playSong', (queue, song) => {
	if (
		queue.repeatMode === 1 ||
		queue.repeatMode === 2
	)
		return;
	queue.textChannel.send(
		'Reproduciendo ahora: **' +
			song.name +
			'** | ' +
			song.formattedDuration
	);
  if (song.playlist) queue.textChannel.send(
		'Reproduciendo playlist: **' +
			song.playList.name +
			'**'
	);
});

client.distube.on('error', (channel, error) => {
	channel.send(error.message);
});

function login(t) {
	t = t ? t : process.env.TOKEN;
	return client.login(`${t}`);
}
fs.readdirSync('./bot/comandos/').forEach(dir => {
	if (dir.endsWith('.js')) {
		let fileName = dir.substring(0, dir.length - 3);

		let fileContents = require(`./bot/comandos/${dir}`);

		client.comandos.set(fileName, fileContents);
	} else {
		const commands = fs.readdirSync(`./bot/comandos/${dir}`);
		for (let file of commands) {
			if (file.endsWith('.js')) {
				let fileName = file.substring(0, file.length - 3);

				let fileContents = require(`./bot/comandos/${dir}/${file}`);

				client.comandos.set(fileName, fileContents);
			}
		}
	}
});
for (const file of fs.readdirSync('./bot/eventos/')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);

		let fileContents = require(`./bot/eventos/${file}`);

		client.on(fileName, fileContents.bind(null, client));
	}
}
const keepAlive = require('./webpage/index.js');
const Monitor = require('ping-monitor');

let monitor;

keepAlive();
websites.forEach(async id => {
	monitor = new Monitor({
		website: id,
		title: 'host',
		interval: 2 // minutes
	});

  let webs = require("megadb")
  webs = new webs.crearDB("websauthor")

	monitor.on('up', res => {
		console.log(`${res.website} está encedido.`);
	});
	monitor.on('down', async res => {
		console.log(`${res.website} se ha caído - ${res.statusMessage}`)
    let web = webs.has(res.website) ? await webs.get(res.website) : null
    if(web) client.users.resolve(web.owner).send("Hola! Nuestro sistema ha detectado que su host `"+res.website+"` se ha caído, si su web vuelve a caerse, nuestro sistema el volverá a avisar dentro de 2 minutos, si desea eliminar el hosting, por favor, únase a mi servidor de soporte y cree un ticket")
  });
	monitor.on('stop', async website => {
    console.log(`${website} se ha parado.`)
    let web = webs.has(website) ? await webs.get(website) : null
    if(web) client.users.resolve(web.owner).send("Hola! Nuestro sistema ha detectado que su host `"+website+"` se ha detenido, si su web vuelve a detenerse, nuestro sistema el volverá a avisar dentro de 2 minutos, si desea eliminar el hosting, por favor, únase a mi servidor de soporte y cree un ticket")
  });
	monitor.on('error', error => console.error(error));
});

login().then(() => {
	console.log(`Estoy listo, soy ${client.user.tag}`);
}).catch(err => {
	console.error('Error al iniciar sesión: ' + err);
	process.exit()
});









// Anti apagos
process.on("unhandledRejection", async error => {
  console.error(error);
  (await client?.channels?.fetch("878389543458451477")).send({embeds: [new Discord.MessageEmbed().setTitle("Bug Detectado").setColor("RANDOM").setDescription('```js\n'+error.stack+'\n```')]})

  if (error.requestData?.json) console.error(require("util").inspect(error.requestData.json, { depth: 5 }));

})