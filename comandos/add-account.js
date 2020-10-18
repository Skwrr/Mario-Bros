module.exports = async (client, message, args) => {
  const msg = message.channel
  const m = message
  message.delete()
  let db = require("megadb");
  var account = new db.crearDB("cuentas");
  const correo = args[0]
  const password = args[1]
  const tipo = args[2]
  if(!correo) return msg.send("**Escribe el email de la cuenta (si alguien obtiene tu cuenta se vera asi  correo:pass)**").then(m => {
    m.delete(3000)
  })
  if(!password) return msg.send("**Escribe la contraseña de la cuenta (si alguin obtiene tu cuenta se vera asi  " +correo+ ":pass)**").then(m => {
      m.delete(3000)
  })
  account.establecer(`${m.guild.id}.${m.author.id}`, `${correo}:${password}`)
  msg.send("**La cuenta ha sido añadida con exito**").then(m => {
    m.delete(2000)
  })
}