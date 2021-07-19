module.exports = {
  name: "prefix",
  description: "Cambia el prefix del servidor",
  use: "(newPrefix)",
  category: 'moderacion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb");
  let prefixdb = new db.crearDB("prefixes");
  var prefix = prefixdb.has(message.guild.id)
    ? await prefixdb.get(message.guild.id)
    : "mb.";

    let premium = new db.crearDB("premium")
if(!premium.has(message.guild.id)) return message.reply("No puedes ejecutar este comando, es solo para servidores premium")
let nuevoprefix = args[0]
    if (!nuevoprefix)
    return message.channel.send('**Escriba un nuevo prefix o `clear` para devolverlo al original**');
  if(args[0] === 'clear'){
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "**No tienes los permisos suficientes para cambiar el prefix del bot**"
    );
    message.channel.send("**Cambiando prefix...**").then(m => {
    prefixdb
      .set(message.guild.id, 'mb.')
      .catch(e => {
        m.edit("**Ha ocurrido un error y no se pudo cambiar el prefix.**"+e.stack);
      })
      .then(() => {
        m.edit('**Prefix cambiado a `mb.`**');
      });
  });
       return true
  }
    
  if (nuevoprefix.length > 3) return message.channel.send("**No puedes poner ese prefix tan largo**")
  
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "**No tienes los permisos suficientes para cambiar el prefix del bot**"
    );
  message.channel.send("**Cambiando prefix...**").then(m => {
    prefixdb
      .set(message.guild.id, nuevoprefix)
      .catch(e => {
        m.edit("**Ha ocurrido un error y no se pudo cambiar el prefix.**"+e.stack);
      })
      .then(() => {
        m.edit(`**Prefix cambiado a ${nuevoprefix}**`);
      });
  });
}
}