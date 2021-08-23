module.exports = {
  name: "pass",
  description: "Intenta conseguir rango en mi servidor de soporte ;)",
  use: "",
  category: 'contraseñas',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const m = message;
  const msg = message.channel;
  const msga = message.author;

  if (!args[0]) {
    msg.send(
      "Error || Escribe `mb.pass canjear`para canjearla"
    );
  }

  if (args[0] === "canjear") {
    const passes = process.env.passes
    if (args[1]){
    if (passes.some(pass => message.content.toLowerCase().includes(pass))){
      m.delete()
      msg.send("Acceso concedido | Contacte con mi administrador para cambiar la pass y darle su premio");
    }
    if (!passes.some(pass => message.content.toLowerCase().includes(pass))){
      msg.send("Acceso denegado | Esa contraseña no es correcta");
    }
  
  }
    if (!args[1]){
      message.channel.send("Envie alguna pass")
    }
  }else if (args[0] !== "canjear"){
    message.reply("**Error || Escribe `s/pass canjear`para canjearla**")
  }
    
  }
}