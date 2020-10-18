module.exports = async (client, message, args) => {
  const db = require("megadb");
  let prefixdb = new db.crearDB("prefixes");
  var prefix = prefixdb.has(message.guild.id)
    ? await prefixdb.get(message.guild.id)
    : "s/";

  
    let nuevoprefix = args.join(" ");
  if (nuevoprefix.length > 3) return message.channel.send("**No puedes poner ese prefix tan largo**")
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "**No tienes los permisos suficientes para cambiar el prefix del bot**"
    );
  if (!nuevoprefix)
    return message.channel.send(`**Mi prefix en este servidor es ${prefix}**`);
  message.channel.send("**Cambiando prefix...**").then(m => {
    prefixdb
      .set(message.guild.id, nuevoprefix)
      .catch(e => {
        m.edit("**Ha ocurrido un error y no se pudo cambiar el prefix.**");
        console.log(e.stack);
      })
      .then(() => {
        m.edit(`**Prefix cambiado a ${nuevoprefix}**`);
      });
  });
};
