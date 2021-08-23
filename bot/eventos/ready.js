module.exports = async(client) => {
  client.user.setPresence({
        activity: {
            name: `mi creador || mb.help`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        },
        status: 'online'
    });
  let guild = client.guilds.resolve("876201162192322572")
  let channel = guild.channels.resolve("876201162628538408")
  let mensaje = await channel.messages.fetch("876214485541589022");
  mensaje.awaitReactions((r, u) => {
      if(u.bot) return
      r.users.remove(u.id)
      guild.members.resolve(u.id).roles.add("876203415552802826")
    });
    channel = guild.channels.resolve("876219094658084874")
    mensaje = await channel.messages.fetch("876219381414240266")
    mensaje.awaitReactions((r, u) => {
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
    })
    mensaje = await channel.messages.fetch("878661578910732308")
    mensaje.awaitReactions((r, u) => {
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
    })
}