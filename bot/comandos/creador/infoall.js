module.exports = {
  name: "infoall",
  description: "Obten informacion sobre mis servidores/usuarios",
  use: "[nombres/ids/invites]",
  category: 'creador',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
    const staff = process.env.OWNERS_ID
    if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
    if(!args[0]){
    message.channel.send(
      `${client.users.cache.filter(x => !x.bot).size} usuarios y ${client.users.cache.filter(x => x.bot).size} bots\n${client.guilds.cache.size} servidores`
    );
  } else if (args[0] === "nombres") {
    var names = client.guilds.cache.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  } else if (args[0] === "names") {
    names = client.guilds.cache.map(g => g.name).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**Nombre de los servidores:\n" + names + "**");
  }else if (args[0] === "ids") {
    var ids = client.guilds.cache.map(g => g.id).join("\n");
    if (message.author.id !== "466241681654808576")
      return message.channel.send(
        "**Solo puede usar este comando mi creador**"
      );
    message.channel.send("**IDs de los servidores:\n" + ids + "**");
  } else if (args[0] !== "nombres" && args[0] !== "names" && args[0] !== "ids" && args[0] !== "invite") {
    message.reply(
      "No existe ningun argumento como ese, los argumentos que existen son `names`, `nombres`, `ids` e `invites`"
    );
  } else if (args[0] == "invite") {
    let guild = client.guilds.resolve(args[1])
    if(!guild) return message.reply("Esa id no es valida")
    if(!guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.reply("No puedo crear invitacion")
    if(guild.sustemChannelId === null){
      await guild.invites.create(guild.channels.cache.random().id,{maxAge: 0, maxUses: 1}).then(invite => {
      let embed = new Discord.MessageEmbed()
      .setDescription(`[${guild.name}](${invite.url})`)
      .setColor("RANDOM")
      message.channel.send({embeds: [embed]})})
    }else{
    await guild.invites.create(guild.systemChannelId,{maxAge: 0, maxUses: 1}).then(invite => {
    let embed = new Discord.MessageEmbed()
    .setDescription(`[${guild.name}](${invite.url})`)
    .setColor("RANDOM")
    message.channel.send({embeds: [embed]})})}/*.then(g => {
      client.guilds.cache.filter(e => e.me.permissions.has("CREATE_INSTANT_INVITE")).forEach(async (guild) => {
        const channel = guild.channels.cache.filter(x => x.type === "text").random()//.map(channel => channel.id).join("\n")
        if(!guild) return message.reply("No existe ese servidor")
        if(!guild.me.permissions.has("CREATE_INSTANT_INVITE")){
          embed.addField(`${guild.name}`, `No se pudo generar una invite`).setColor("RANDOM")
        }
          let invite = await channel.createInvite({maxAge: 0, maxUses: 1})
          embed.addField(`${guild.name}`, `${invite}`).setColor("RANDOM")
          setTimeout(() => {
            g.edit({embeds: [embed]})
          }, 2500)
        
      })
      g.edit({embeds: [embed]})
    })*/
    
  }
  }
}