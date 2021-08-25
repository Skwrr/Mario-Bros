module.exports = async(client) => {
  client.user.setPresence({
        activities: [{
            name: `mi creador || /help`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        }],
    });
  let guild = client.guilds.resolve("876201162192322572")
  let channel = guild.channels.resolve("876201162628538408")
  let mensaje = await channel.messages.fetch("876214485541589022");
  let filter = (r, u) => {
    if(u.bot) return
    r.users.remove(u.id)
    guild.members.resolve(u.id).roles.add("876203415552802826")
  }
  mensaje.awaitReactions({filter});
  channel = guild.channels.resolve("876219094658084874")
  mensaje = await channel.messages.fetch("876219381414240266")
  filter = (r, u) => {
    let user = guild.members.resolve(u.id)
    r.users.remove(u.id)
    if(u.bot) return
    if(r.emoji.name === "🍎"){
      user.roles.add("876218815170613248")
    }else if(r.emoji.name === "🔵"){
      user.roles.add("876218910821736528")
    }else if(r.emoji.name === "💛"){
      user.roles.add("876218949572915210")
    }else if(r.emoji.name === "🍏"){
      user.roles.add("876218989498474577")
    }else if(r.emoji.name === "⬜"){
      ["876218815170613248", "876218910821736528", "876218949572915210", "876218989498474577"].forEach(all => user.roles.remove(all))
    }
  }
  mensaje.awaitReactions({filter})
  mensaje = await channel.messages.fetch("878661578910732308")
  filter = (r, u) => {
    let user = guild.members.resolve(u.id)
    r.users.remove(u.id)
    if(u.bot) return
    if(r.emoji.name === "🎉"){
      user.roles.add("877927668715229245")
    }else if(r.emoji.name === "🥓"){
      user.roles.add("877927597047185418")
    }else if(r.emoji.name === "⬜"){
      ["877927668715229245", "877927597047185418"].forEach(all => user.roles.remove(all))
    }
  }
  mensaje.awaitReactions({filter})

  guild = client.guilds.resolve("878770744446840843")
  channel = guild.channels.resolve("879735060020989983")
  await channel.messages.fetch("879737716886093874").then(m => {
  filter = (btn) => {
    if(btn.user.bot) return
    btn.member.roles.add("879484166989824100")
    btn.reply({content: "Rol Miembro agregado", ephemeral: true})
  }
  m.awaitMessageComponent({filter, componentType: "BUTTON"})
  })
  





//     //SlashCommands
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const token = process.env.TOKEN
// let fs = require("fs")

// const commands = [];

// fs.readdirSync('../comandos/').forEach(dir => {
// 	if (dir.endsWith('.js')) {
// 		let fileName = dir.substring(0, dir.length - 3);

// 		let fileContents = require(`../comandos/${dir}`);

//     if(dir.SlashCommand && dir.SlashCommand.run){
//       let data = {
//         name: dir.name,
//         description: dir.description,
//         options: dir.SlashCommand.options,
//       };

//       commands.push(data)
//     }
// 	} else {
// 		const commands = fs.readdirSync(`../comandos/${dir}`);
// 		for (let file of commands) {
// 			if (file.endsWith('.js')) {
// 				let fileName = file.substring(0, file.length - 3);

// 				let fileContents = require(`../comandos/${dir}/${file}`);

//         if(file.SlashCommand && file.SlashCommand.run){
//           let data = {
//             name: file.name,
//             description: file.description,
//             options: file.SlashCommand.options,
//           };

//           commands.push(data)
//         }
// 			}
// 		}
// 	}
// });

// const rest = new REST({ version: '9' }).setToken(token);

// (async () => {
// 	try {
// 		console.log('Started refreshing application (/) commands.');

// 		await rest.put(
// 			Routes.applicationCommands(client.user.id),
// 			{ body: commands },
// 		);

// 		console.log('Successfully reloaded application (/) commands.');
// 	} catch (error) {
// 		console.error(error.message);
// 	}
// })();
client.comandos.forEach(cmd => {
  if(cmd.SlashCommand && cmd.SlashCommand.run){
    let data = {
      name: cmd.name,
      description: cmd.description,
      options: cmd.SlashCommand.options,
    };
    client.guilds.cache.forEach(guild => client.guilds.cache.get(guild.id).commands.create(data).catch(error => {
      return console.log(`${error.message} en guild ${guild.name}`)
    }))
    //client.guilds.cache.get("876201162192322572").commands.create(data)
  }
})
}