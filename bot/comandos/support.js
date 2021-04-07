module.exports = async(client, message, args) => {


	const supportnamech = message.author.tag
      .replace(/[^a-zA-z0-9 ]/g, "-")
      .trim()
      .toLowerCase();
  const everyone = message.guild.roles.find(m => m.name == "@everyone");
if(args[0] === "close"){
  if(!message.member.hasPermissions("MANAGE_CHANNELS")) return message.reply("No tienes permiso para cerrar un ticket")

  message.channel.send("Cerrando ticket en 5 segundos")
  setTimeout(() => {
    message.channel.send("Cerrando ticket en 4 segundos")
  }, 1000)
  setTimeout(() => {
    message.channel.send("Cerrando ticket en 3 segundos")
  }, 2000)
  setTimeout(() => {
    message.channel.send("Cerrando ticket en 2 segundos")
  }, 3000)
  setTimeout(() => {
    message.channel.send("Cerrando ticket en 1 segundo").then(() => {
    message.channel.delete()
  })
  }, 4000)
  
  
  
  
  
  return true
}







    message.delete()
  let mensaje_soporte = await message.channel.send('Para crear un canal de soporte, elige una de las siguientes razones, reaccionando a sus emojis correspondientes.\n\nEmoji1: Fallos & Bugs\nEmoji2: Hackers\nEmoji3: Otro\nEmoji4: Ranks (Rangos)');



await mensaje_soporte.react('674306744423284776').then(async() => {
  await mensaje_soporte.react('674306810345160716').then(async() => {
    await mensaje_soporte.react('674306810429046844').then(async() => {
      await mensaje_soporte.react('🥨');
    })
  })
})



let colector = mensaje_soporte.createReactionCollector((reaction, user) => {
	return user.id !== client.user.id && user.id == message.author.id 
});

colector.on('collect', (reaction) => {

	mensaje_soporte.delete(); 

	var reason; 

	if(reaction.emoji.name === 'encendido'){
		
		reason = 'Fallos & Bugs';
	}else if(reaction.emoji.name === 'con_problemas'){
		
		reason = 'Hackers';
	}else if(reaction.emoji.name === 'apagado'){
    
    reason = 'Otro'
  }else{

    reason = 'Rangos'
  }
	message.channel.send('Se ha creado un canal de soporte para ti').then(async (m) => {
		await m.delete(10000); 
	});

	let ticketsupport = message.guild.roles.find(
      r => r.name == "Soporte de Tickets"
    ); 
    if (!ticketsupport)
      return message.channel.send(
        "X `|` **Necesita Crear El Rango** ``Soporte de Tickets``"
      ).then(m => m.delete(900000));

  let cate = message.guild.channels.find(
      c => c.name == "┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑" && c.type == "category"
    ); 
    if (!cate)
      return message.guild.createChannel("┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑", {
        type: "category"
      });
	message.guild
      .createChannel(supportnamech, {
        type: "text",
        permissionOverwrites: [
          {
            id: everyone.id, 
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] 
          },
          {
            id: ticketsupport.id, 
            allow: ["VIEW_CHANNEL", , "SEND_MESSAGES"] 
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }
        ],
        parent: cate.id 
	}).then(async (channel) => {
		await channel.send(`${ticketsupport}\n**El usuario ${message.author} ha creado este canal, razon: ${reason}**`).then(async (m) => {
		});
	});
});
}