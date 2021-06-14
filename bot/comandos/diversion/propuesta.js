module.exports = {
  name: "propuesta",
  description: "Proponle una propuesta de matrimonio a alguien",
  use: "(@user)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  
  
 const db = require("megadb") 
 const db_marry = new db.crearDB("marry") 
 const prefixdb = new db.crearDB("prefixes")
  var prefix = prefixdb.tiene(message.guild.id) ? await prefixdb.obtener(message.guild.id) : "hp";
  const usuario =
        message.mentions.users.first() || client.users.cache.get(args[0]);

      if (!usuario)
        return message.channel.send(
          "Este usuario no existe. Método: `"+prefix+"propuesta <@usuario/usuarioid>`"
        );

      message.channel.send(
        `${usuario.tag}, aceptas la propuesta de ${message.author.tag}?`
      );

      const collector = message.channel.createMessageCollector(
        m => m.author.id === usuario.id && m.channel.id === message.channel.id,
        { time: 30000 }
      );
      collector.on("collect", collected => {
        if (collected.content.toLowerCase() === "yes") {
          message.channel.send("Felicidades a la nueva pareja");
          db_marry.establecer(message.author.id, usuario.id);
          db_marry.establecer(usuario.id, message.author.id);
          return;
        } else if (collected.content.toLowerCase() === "no") {
          message.channel.send("Parece que la propuesta ha sido rechazada");
          return;
        }
      });

      collector.on("end", collected => {
        if (collected.size === 0)
          return message.channel.send(
            "Parece que alguien huye del matrimonio :rolling_eyes:"
          );
      });
}
}