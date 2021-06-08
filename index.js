//El primer bot que hice
const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
require('dotenv').config();

client.comandos = new Discord.Collection();

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
const keepAlive = require('./webpage/server.js');
const Monitor = require('ping-monitor');

keepAlive();
let monitor = new Monitor({
	website: 'https://Host.sergioesquina.repl.co/',
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