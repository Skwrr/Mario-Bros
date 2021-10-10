module.exports = {
  name: "rcmd",
  description: "Reinicia un comando",
  use: "(commandName) (commandCategory)",
  perms: {
    owner: process.env.OWNERS_ID
  },
  category: 'creador',
  alias: ["reloadcmd", "reloadcommand", "resetcommand", "rcommand"],
  async run(client, message, args) {
    const Discord = require("discord.js")

    const fs = require("fs")

    let commandCategory = args[1]
    let commandName = args[0];
    if(!args[0]) return message.channel.send("❌ **Coloca el nombre del comando a reiniciar** ❌");
    if(!args[1]) {
      // if(!client.comandos.has(commandName)) {
      //   return message.channel.send("❌ **Ese comando no Existe** ❌");
      // }
      // try{
      //   require(`../${commandName}.js`)
      // }catch (error){
      //   message.channel.send("❌ Ese comando no Existe en esa Carpeta ❌")
      //   return
      // }

      try {
        delete require.cache[require.resolve(`../${commandName}.js`)];
  
        client.comandos.delete(commandName);
        let fileContents = require(`../${commandName}.js`);
        client.comandos.set(commandName, fileContents);

        message.reply("✅`"+commandName+".js` **se ha Reiniciado con Exito** ✅")

      } catch (error) {

        try{
          require(`../${commandName}.js`)
        }catch (error){
          message.channel.send("❌ Ese comando no Existe en esa Carpeta ❌")
          return
        }

        message.reply("❌ **Ocurrió error al reinicar el comando** ❌");
        let embed2 = new Discord.MessageEmbed()
        .setTitle("Error")
        .setColor("RANDOM")
        .setDescription(error);
        message.channel.send({embeds: [embed2]})
      }
      return
    }
    

    // if(!client.comandos.has(commandName)) {
    //   return message.channel.send("❌ **Ese comando no Existe** ❌");
    // }
    try {
      delete require.cache[require.resolve(`../${commandCategory}/${commandName}.js`)];
  
      client.comandos.delete(commandName);
      let fileContents = require(`../${commandCategory}/${commandName}.js`);
      client.comandos.set(commandName, fileContents);

      message.reply("✅`"+commandCategory+"/"+commandName+".js` **se ha Reiniciado con Exito** ✅")

    } catch (error) {

      try{
        require(`../${commandCategory}/${commandName}.js`)
      }catch (error){
        message.channel.send("❌ Ese comando no Existe ❌")
        return
      }

      message.reply("❌ **Ocurrió error al reinicar el comando** ❌");
      let embed2 = new Discord.MessageEmbed()
      .setTitle("Error")
      .setColor("RANDOM")
      .setDescription(error);
      message.channel.send({embeds: [embed2]})
    }
  }
}