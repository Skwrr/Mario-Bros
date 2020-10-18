module.exports = async (client, message) => {
  
  const db = require("megadb");
  let prefixdb = new db.crearDB("prefixes")
if(message.channel.type === "dm"){
  var prefix = "hp";
} else {
  var prefix = prefixdb.tiene(message.guild.id) ? await prefixdb.obtener(message.guild.id) : "hp"
}
  
  if (!message.content.startsWith(prefix.toLowerCase())) return;
  if (message.author.bot) return;
  
  //Args y command
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const Discord = require("discord.js");
  //No se ques esto :v
  let cmd = client.comandos.get(command);
  if (!cmd) return message.reply('**No existe ese comando, pero puedes sugerirlo contactando con mi dueño ;)**')
  
  cmd(client, message, args, Discord)
};