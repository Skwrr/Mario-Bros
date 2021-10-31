module.exports = {
  name: "support",
  description: "Crea un ticket",
  use: "",
  category: 'ayuda',
  alias: ["ticket"],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const { MessageButton: mb, MessageActionRow: mar } = Discord
  const supportnamech = "ticket-"+message.author.username
    .replace(/[^a-zA-z0-9 ]/g, '-')
    .trim()
    .toLowerCase();
  const everyone = message.guild.roles.cache.find(m => m.name == '@everyone');
  const original = message.author

  let buttons = {}
    buttons.first = new mar().addComponents([new mb().setStyle("PRIMARY").setLabel("Fallos & Bugs").setEmoji("1️⃣").setCustomId("fallosybugs"), new mb().setStyle("PRIMARY").setLabel("Hackers").setEmoji("2️⃣").setCustomId("hackers"), new mb().setStyle("PRIMARY").setLabel("Otro").setEmoji("3️⃣").setCustomId("otro"), new mb().setStyle("PRIMARY").setLabel("Rangos").setEmoji("4️⃣").setCustomId("rangos")])
    buttons.second = new mar().addComponents([new mb().setStyle("PRIMARY").setLabel("Close Ticket").setEmoji("🔒").setCustomId("close"), new mb().setStyle("PRIMARY").setLabel("Delete Ticket (Not recoverable)").setEmoji("🗑️").setCustomId("delete")])
    buttons.third = new mar().addComponents(new mb().setStyle("PRIMARY").setLabel("Reopen Ticket").setEmoji("🔑").setCustomId("reopen"))

  message.delete();
  if (!args[0]) {
    let mensaje_soporte = await message.channel.send({content:
      'Para crear un canal de soporte, elige una de las siguientes razones, reaccionando a sus emojis correspondientes.\n\nEmoji1: Fallos & Bugs\nEmoji2: Hackers\nEmoji3: Otro\nEmoji4: Ranks (Rangos)',
    components: [buttons.first]});

    mensaje_soporte.awaitMessageComponent({componentType: "BUTTON", time: 30000, filter: (btn) => {
      if (btn.user.id !== message.author.id || btn.user.bot) return btn.reply({content:"No puedes reaccionar a este botón",ephemeral:true})
    
      console.log(btn)

      var reason
      if(btn.customId == "otro") reason = "Otro"
      else if(btn.customId == "rangos") reason = "Rangos"
      else if(btn.customId == "hackers") reason = "Hackers"
      else reason = "Fallos & Bugs"

      let ticketsupport = message.guild.roles.cache.find(
        r => r.name == 'Soporte de Tickets'
      );
      if (!ticketsupport)
        return btn
          .reply({content: 'X `|` **Necesita Crear El Rango** ``Soporte de Tickets``', ephemeral: true})

      btn
        .reply({content: 'Se ha creado un canal de soporte para ti',ephemeral: true})
        mensaje_soporte.delete();

      let cate = message.guild.channels.cache.find(
        c => c.name == '┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑' && c.type == 'GUILD_CATEGORY'
      );
      if (!cate)
        cate = message.guild.channels.create('┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑', {
          type: 'GUILD_CATEGORY'
        });
      message.guild.channels.create(supportnamech, {
          type: 'GUILD_TEXT',
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
              id: btn.user.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
          ],
          parent: cate.id
        })
        .then(async channel => {
          channel
            .send(
              {content: `${ticketsupport}\n**El usuario ${
              message.author
              } ha creado este canal, razon: ${reason}**`, components: [buttons.second]}
            )
            .then(a => {
              a.awaitMessageComponent({componentType: "BUTTON", filter: async(btna) => {
                if(btna.user.bot)return;
                if (btna.customId == 'close') {
                  if(btna.user.bot)return;
                  channel.permissionOverwrites.set([
                    {
                      id: everyone.id,
                      deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                      id: ticketsupport.id,
                      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                  ]);
                  channel.send({content: "Ticket cerrado por: "+ btna.user.username+"\nPara volver a abrir este ticket, reaccione con 🔑", components: [buttons.third]}).then(async m => {
                    m.awaitMessageComponent({componentType: "BUTTON", filter: async(btnn) => {
                      if(btnn.customId === 'reopen') {
                        if(btnn.user.bot) return;
                        m.delete()
                        channel.permissionOverwrites.set([
                          {
                            id: everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          },
                          {
                            id: ticketsupport.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          },
                          {
                            id: btn.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                          }
                  ]);
                  btnn.reply({content: "Ticket Abierto", ephemeral: true})
                      }
                    }}).catch(err => {
                      if(err.reason == "messageDelete") return;
                      if(err.reason == "channelDelete") return;
                    })
                  })
                }
                if(btna.customId == "delete"){
                  if (!(await channel.guild.members.fetch(btna.user.id)).roles.cache.has(ticketsupport.id)) return btn.reply({content: 'No tienes permiso para cerrar un ticket', ephemeral: true});

                  let cate = channel.guild.channels.cache.find(
                    c => c.name == '┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑' && c.type == 'GUILD_CATEGORY'
                  );
                  if (!channel.parent || channel.parent.id != cate.id)
                    return btn.reply({content: 'Este canal no es un ticket', ephemeral: true});

                  channel.send('Cerrando ticket en 5 segundos');
                  setTimeout(() => {
                    channel.send('Cerrando ticket en 4 segundos');
                  }, 1000);
                  setTimeout(() => {
                    channel.send('Cerrando ticket en 3 segundos');
                  }, 2000);
                  setTimeout(() => {
                    channel.send('Cerrando ticket en 2 segundos');
                  }, 3000);
                  setTimeout(() => {
                    channel.send('Cerrando ticket en 1 segundo').then(() => {
                      setTimeout(() => channel.delete(), 2000)
                    });
                  }, 4000);
                }
                btna.deferUpdate()
              }}).catch(err => {
                if(err.reason == "messageDelete") return;
                if(err.reason == "channelDelete") return;
              })
            });
        });
    }}).catch(err => {
      mensaje_soporte.edit("Se acabó el tiempo").catch(console.error)
    })
  }// else if (args[0] === 'close') {
  //   if (!message.member.permissions.has('MANAGE_CHANNELS'))
  //     return message.reply('No tienes permiso para cerrar un ticket');

  //   let cate = message.guild.channels.cache.find(
  //     c => c.name == '┗⎯⎯⎯|🍀|TICKETS|🍀|⎯⎯⎯┑' && c.type == 'GUILD_CATEGORY'
  //   );
  //   if (!message.channel.parent || message.channel.parent.id != cate.id)
  //     return message.channel.send('Este canal no es un ticket');

  //   message.channel.send('Cerrando ticket en 5 segundos');
  //   setTimeout(() => {
  //     message.channel.send('Cerrando ticket en 4 segundos');
  //   }, 1000);
  //   setTimeout(() => {
  //     message.channel.send('Cerrando ticket en 3 segundos');
  //   }, 2000);
  //   setTimeout(() => {
  //     message.channel.send('Cerrando ticket en 2 segundos');
  //   }, 3000);
  //   setTimeout(() => {
  //     message.channel.send('Cerrando ticket en 1 segundo').then(() => {
  //       setTimeout(() => message.channel.delete(), 2000)
  //     });
  //   }, 4000);

  //   return true;
  // }
}
}