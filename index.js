//El primer bot que hice
const Discord = require('discord.js');
const client = new Discord.Client();
let { readdirSync } = require('fs');
require('dotenv').config();

client.comandos = new Discord.Collection();

function login(t){
  if(!t) t=process.env.TOKEN;
  return client.login(`${t}`)
}

for (const file of readdirSync('./bot/comandos/')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);

		let fileContents = require(`./bot/comandos/${file}`);

		client.comandos.set(fileName, fileContents);
	}
}
for (const file of readdirSync('./bot/eventos/')) {
	if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);

		let fileContents = require(`./bot/eventos/${file}`);

		client.on(fileName, fileContents.bind(null, client));
	}
}
const keepAlive = require('./webpage/server.js');
const Monitor = require('ping-monitor');

keepAlive();
let monitor = new Monitor({
	website: 'https://Zoot.tscollab.repl.co/',
	title: 'host',
	interval: 5 // minutes
});

monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) =>
	console.log(`${res.website} se ha caído - ${res.statusMessage}`)
);
monitor.on('stop', (website) => console.log(`${website} se ha parado.`));
monitor.on('error', (error) => console.error(error));

login()
	.then(() => {
		console.log(`Estoy listo, soy ${client.user.tag}`);
	})
	.catch(err => {
		console.error('Error al iniciar sesión: ' + err);
	});