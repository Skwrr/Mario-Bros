module.exports = async(client, guild) => {
  const mmdb = require('manage-maliciousdb');
  const Discord = require("discord.js")
  let db = require("megadb")
  let arr = []
  guild.members.cache.forEach(async member => {
    const isMalicious = await mmdb.findElementByID(member);

    if (isMalicious) {
      arr.push(guild.members.resolve(isMalicious.id).tag)
      guild.channels.random().send(`Usuario Malicioso:\nID: ${isMalicious.id}\nReason: ${isMalicious.razon}\nProof: ${isMalicious.prueba}`);
    }
  })
  const embed = new Discord.MessageEmbed()
  .setTitle("Nuevo Servidor!")
  .setDescription(guild.name)
  .addField("Usuarios peligrosos", arr.length.toString())
  .setThumbnail(guild.iconURL())
  .setColor("RANDOM")
  client.channels.cache.get("877874680739024936").send({embeds: [embed]})


  client.comandos.forEach(cmd => {
    if(cmd.SlashCommand && cmd.SlashCommand.run){
      let data = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.SlashCommand.options,
      }
        client.guilds.cache.get(guild.id).commands.create(data).catch(error => {
        return console.log(`${error.message} en guild ${guild.name}`)
      })
      //client.guilds.cache.get("876201162192322572").commands.create(data)
    }
  })

  let config = new db.crearDB("backupconfig"),
  staffRole = await config.get(guild.id)
  if(!staffRole) config.set(guild.id, "ADMINISTRATOR")
}