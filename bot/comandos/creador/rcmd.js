module.exports = async(client, message, args, Discord) => {
  const fs = require("fs")
  const staff = process.env.OWNERS_ID
  if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")

  if(!args[0]) return message.channel.send("❌ **Coloca el nombre del comando a reiniciar** ❌");
  if(!args[1]) return message.channel.send("❌ **Coloca el nombre del categoría a reiniciar** ❌");
  const commandCategory = args[1];
  const commandName = args[0];
  
  if(!client.comandos.has(commandName)) {
    return message.channel.send("❌ **Ese comando no Existe** ❌");
  }
  try {
    delete require.cache[require.resolve(`../${commandCategory}/${commandName}.js`)];
  
    client.comandos.delete(commandName);
    let fileContents = require(`../${commandCategory}/${commandName}.js`);
    client.comandos.set(commandName, fileContents);

    message.reply("✅`"+commandCategory+"/"+commandName+".js` **se ha Reiniciado con Exito** ✅")

  } catch (error) {

    message.reply("❌ **Ocurrió error al reinicar el comando** ❌");
    let embed2 = new Discord.MessageEmbed()
    .setTitle("Error")
    .setColor("RANDOM")
    .setDescription(error);
    message.channel.send(embed2)
  }
}