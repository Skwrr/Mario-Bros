module.exports = async (client, message, args) => {
  const msg = message.channel
  const m = message
  const db = require("megadb");
  const cuentas = new db.crearDB("cuentas");
  let cuenta = await cuentas.obtener(m.guild.id)
  
  msg.send("**La cuenta ha sido enviada a su MD**")
  m.author.send("**La cuenta es\n** **" + cuenta + "**\n**El email es lo que esta en la izquierda de el ':' y a la derecha la contraseña**")
  cuentas.eliminar(cuenta)
}