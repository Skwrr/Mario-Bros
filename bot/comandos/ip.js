module.exports = async(client, message, args) => {
  let db = require("megadb")
  let ipdb = new db.crearDB("ipdb")
  if (message.guild.id === "720657677323075584") {
    if(message.member.hasPermission("ADMINISTRAOR")){
      if(!args[0]) return message.channel.send(await ipdb.get(message.guild.id))
      if(args[0] === 'set'){
        if(!args[1]) return message.reply('Escriba la nueva ip')
      ipdb.set(message.guild.id, args[1])
      message.channel.send("Ip establecida correctamente")
      return true;
    }else{
      return message.reply('Ese argumento no existe')
    }
    }
    return message.channel.send("No tenes perms")
  } else {
    message.channel.send(
      "**Este comando es esclusivo para un servidor, si le gustaria tener su comando exclusivo contacte con mi creador (" +
        process.env.OWNER +
        ")**"
    );
  }
};
