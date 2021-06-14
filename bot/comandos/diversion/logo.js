const db = require("megadb");
const logos = new db.crearDB("logos");
module.exports = {
  name: "logo",
  description: "Genera u obten el ultimo logo generado",
  use: "(gen/reget) (algo)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const texto = args.slice(1).join("%20");
  if (args[0] === "gen") {
    if(!texto) return message.reply("Escriba algo para 'loguear'")
    message.channel.send({
      files: [
        {
          attachment: `https://gdcolon.com/tools/gdlogo/img/${texto}`,
          name: "logo.png"
        }
      ]
    });
    logos.establecer(message.guild.id, texto);
  } else if (args[0] === "reget") {
    message.channel
      .send({
        files: [
          {
            attachment: `https://gdcolon.com/tools/gdlogo/img/${await logos.obtener(message.guild.id)}`,
            name: "logo.png"
          }
        ]
      })
      .catch(e => {
        message.reply(
          "Ha sucedido un problema (" + e + ")"
        );
      });
    message.channel.send("Aca tiene su logo :)");
  }else if(args[0] !== "gen" && args[0] !== "reget"){
    message.reply("Ese subcomando no existe, los unicos que hay son `gen` y `reget`")
  }
}
}