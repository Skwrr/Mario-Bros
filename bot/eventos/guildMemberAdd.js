module.exports = async(client, member) => {
  const mmdb = require('manage-maliciousdb');
  const Discord = require("discord.js")
  let db = require("megadb")
  db = new db.crearDB("bienvenidas")
  let wlcch = await db.get(member.guild.id)
  let arr = []
  const ms = require("@fabricio-191/ms")
  const isMalicious = await mmdb.findElementByID(member.id);

  const embed = new Discord.MessageEmbed()
  .setTitle("Nuevo usuario")
  .setDescription(`${member}, Bienvenido a **`+member.guild.name+"**")
  .addField("Cuenta creada", `<t:${Math.floor(Number(member.user.createdAt / 1000))}>`)
  .setThumbnail(member.user.displayAvatarURL())
  .setColor("RANDOM")
  /*let guild = client.guilds.resolve(member.guild.id)
  let channel = guild.channels.resolve(wlcch)
  channel.send("Bienvenido!",embed)*/
  if(!wlcch) return
  else client.channels.fetch(wlcch).then(ch => ch.send({embeds: [embed]}))

  if (isMalicious) {
    arr.push(member.guild.members.resolve(isMalicious.id).tag)
    if(!wlcch) return
    else client.channels.fetch(wlcch).then(ch => ch.send(`Usuario Malicioso:\nID: ${isMalicious.id}\nReason: ${isMalicious.razon}\nProof: ${isMalicious.prueba}`))
  }
  if(member.guild.id === "876201162192322572"){
    if(member.user.bot){
      member.roles.add("877297208838467644")
    }
  }
}