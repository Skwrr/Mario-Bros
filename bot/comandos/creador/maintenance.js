module.exports = {
  name: "maintenance",
  description: "Agrega modo mantenimiento al bot",
  use: "(on/off)",
  alias: ["mantenimiento", "maint"],
  category: "creador",
  perms: {
    owner: process.env.OWNERS_ID
  },
  async run(client, message, args){
    let db = require("megadb")
    db = new db.crearDB("maintenance")
    if(!args[0]) return message.reply("Debes establecer un argumento")
    switch (args[0]){
      case "on":
        db.set("status", "on")
        message.reply("Mantenimiento activado")
      break;
      case "off":
        db.set("status", "off")
        message.reply("Mantenimiento desactivado")
      break;
      default:
        message.reply("Ese argumento no es válido")
      break;
    }
  }
}