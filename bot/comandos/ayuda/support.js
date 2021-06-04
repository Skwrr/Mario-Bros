module.exports = async (client, message, args) => {
  const supportnamech = message.author.tag
    .replace(/[^a-zA-z0-9 ]/g, '-')
    .trim()
    .toLowerCase();
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone');
  const original = message.author

  message.delete();
  if (!args[0]) {
    let mensaje_soporte = await message.channel.send(
      'Para crear un canal de soporte, elige una de las siguientes razones, reaccionando a sus emojis correspondientes.\n\nEmoji1: Fallos & Bugs\nEmoji2: Hackers\nEmoji3: Otro\nEmoji4: Ranks (Rangos)'
    );

    await mensaje_soporte.react('674306744423284776');
    await mensaje_soporte.react('674306810345160716');
    await mensaje_soporte.react('674306810429046844');
    await mensaje_soporte.react('🥨');

    mensaje_soporte.awaitReactions((reactione, usere) => {
      if (usere.id !== message.author.id || usere.id === client.user.bot) return
    
      mensaje_soporte.delete();

      var reason;

      if (reactione.emoji.name === 'encendido') {
        reason = 'Fallos & Bugs';
      } else if (reactione.emoji.name === 'con_problemas') {
        reason = 'Hackers';
      } else if (reactione.emoji.name === 'apagado') {
        reason = 'Otro';
      } else {
        reason = 'Rangos';
      }
      message.channel
        .send('Se ha creado un canal de soporte para ti')
        .then(m => {
          m.delete({timeout: 10000});
        });

      let ticketsupport = message.guild.roles.cache.find(
        r => r.name == 'Soporte de Tickets'
      );
      if (!ticketsupport)
        return message.channel
          .send('X `|` **Necesita Crear El Rango** ``Soporte de Tickets``')
          .then(m => m.delete(900000));

      let cate = message.guild.channels.cache.find(
        c => c.name == '┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑' && c.type == 'category'
      );
      if (!cate)
        return message.guild.channel.create('┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑', {
          type: 'category'
        });
      message.guild.channels.create(supportnamech, {
          type: 'text',
          permissionOverwrites: [
            {
              id: everyone.id,
              deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
              id: ticketsupport.id,
              allow: ['VIEW_CHANNEL', , 'SEND_MESSAGES']
            },
            {
              id: usere.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
          ],
          parent: cate.id
        })
        .then(async channel => {
          channel
            .send(
              `${ticketsupport}\n**El usuario ${
              message.author
              } ha creado este canal, razon: ${reason}**`
            )
            .then(a => {
              a.react('🔒');
              a.awaitReactions((reaction, user) => {
                if(user.bot)return;
                if (reaction.emoji.name === '🔒') {
                  if(user.bot)return;
                  reaction.users.remove(user.id);
                  a.react('🔒')
                  channel.overwritePermissions([
                    {
                      id: everyone.id,
                      deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                      id: ticketsupport.id,
                      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                  ]);
                  channel.send("Ticket cerrado por: "+ user.username+"\nPara volver a abrir este ticket, reaccione con 🔑").then(async m => {
                    await m.react("🔑")
                    m.awaitReactions((reactiona, usera) => {
                      if(reactiona.emoji.name === '🔑') {
                        if(user.bot) return;
                        reactiona.users.remove(user.id);
                        channel.overwritePermissions([
                          {
                            id: everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          },
                          {
                            id: ticketsupport.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          },
                          {
                            id: usere.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          }
                  ]);
                      }
                    })
                  })
                }
              });
            });
					/*
      let colector = mens.createReactionCollector((reaction, user) => {
	      return user.id !== client.user.id
      });

      colector.on('collect', (reaction) => { 

	      if(reaction.emoji.name === 'key' || reaction.emoji.name === '🔑'){
		     reaction.message.channel.overwritePermissions([
		       {
		       id: message.author.id,
		       deny: ["VIEW_CHANNEL"]
		       }
		     ])
	      }
	      })*/
        });
    })
  } else if (args[0] === 'close') {
    if (!message.member.permissions.has('MANAGE_CHANNELS'))
      return message.reply('No tienes permiso para cerrar un ticket');

    let cate = message.guild.channels.cache.find(
      c => c.name == '┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑' && c.type == 'category'
    );
    if (!message.channel.parent || message.channel.parent.id != cate.id)
      return message.channel.send('Este canal no es un ticket');

    message.channel.send('Cerrando ticket en 5 segundos');
    setTimeout(() => {
      message.channel.send('Cerrando ticket en 4 segundos');
    }, 1000);
    setTimeout(() => {
      message.channel.send('Cerrando ticket en 3 segundos');
    }, 2000);
    setTimeout(() => {
      message.channel.send('Cerrando ticket en 2 segundos');
    }, 3000);
    setTimeout(() => {
      message.channel.send('Cerrando ticket en 1 segundo').then(() => {
        message.channel.delete({timeout: 1000});
      });
    }, 4000);

    return true;
  }
};
