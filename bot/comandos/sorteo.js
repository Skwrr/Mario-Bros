module.exports = async(client, message, args, Discord) => {
  const sorteo = args.slice(1).join(" ");
  const tiempo = args[0]

  if(!tiempo) return message.reply("Escribe en cuanto tiempo (en segundos) desea acabar este evento")
  if(!sorteo) return message.reply("Escribe que deseas sortear")


  const embed = new Discord.RichEmbed()
  .setTitle("**Reacciona en el mensaje para participar**")
  .setDescription(`**${sorteo}**`)
  .setFooter(`Este sorteo acabará en ${tiempo} segundos`)
  .setTimestamp()
  
  message.channel.send("@everyone").then(() => {
  message.channel.send(embed).then(msg => {

msg.react("💚") 

const filter = (reaction, user) => reaction.emoji.name == '💚' && user.id !== client.user.id; 

const collector = msg.createReactionCollector(filter, {time: tiempo * 1000}); 

var array = [] 

collector.on("collect", r => {
array.push(r.users.last().id); 
})

collector.on("end", () => {

const winner = array[Math.floor(Math.random() * array.length)]


if(winner === undefined || null) return message.channel.send("Nadie ha ganado, porque nadie participó")
message.channel.send("Ganador <@"+winner+">")

})

})
  })

}