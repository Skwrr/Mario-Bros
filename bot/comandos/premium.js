module.exports = async(client, message, args, Discord) => {
  const db = require("megadb")
  const gp = new db.crearDB("premium")
  let premium = gp.has(message.guild.id)
  if(!args[0]){
    if(!premium) return message.reply("Tu servidor necesita ser premium para ejecutar este comando, puedes adquirirlo mandandole un mensaje a mi creador; <@!"+process.env.OWNER_ID+">")
    message.channel.send("Hay distintos argumentos; `add` y `remove`")
    return
  }
    if(args[0] === 'add' || args[0] === 'añadir'){
      if(message.author.id != process.env.OWNER_ID) return message.reply('Tu no eres mi dueño, no tienes permiso a este comando')
      var guild = client.guilds.get(args[1])
      var sv = args[1]
      if(args[1] === 'this') {
        guild = client.guilds.get(message.guild.id);
        sv = message.guild.id;
      }
      
      if(!guild) return message.reply("Escriba la id de algun servidor en el que yo esté")
      if(premium){
        message.reply("Ese servidor ya es premium")
        return
      }
      let cate = guild.channels.find( c => c.name == "anuncios" && c.type == "text");
      if (!cate) {
    guild.createChannel("anuncios", {
      type: "text"
    });
    message.reply('Vuelve a escribir este comando').then(m => {
      m.delete(6000)
    })
    return;
      }
      cate.send("Hola! Vengo a avisar que tu servidor ha sido activado como premium ¡FELICIDADES!")
      gp.set(sv, sv)
    
  }else if(args[0] === 'remove' || args[0] === 'delete' || args[0 === 'borrar']){
    if(message.author.id != process.env.OWNER_ID) return message.reply('Tu no eres mi dueño, no tienes permiso a este comando')
      var guild = client.guilds.get(args[1])
      var sv = args[1]
      if(args[1] === 'this') {
        guild = client.guilds.get(message.guild.id);
        sv = message.guild.id;
      }
      if(!guild) return message.reply("Escriba la id de algun servidor en el que yo esté")
      if(!premium){
        message.reply("Ese servidor no es premium")
        return
      }
      let cate = guild.channels.find( c => c.name == "anuncios" && c.type == "text");
      if (!cate) {
    guild.createChannel("anuncios", {
      type: "text"
    });
    message.reply('Vuelve a escribir este comando').then(m => {
      m.delete(6000)
    })
    return
      }
      cate.send("Hola! Siento mucho decir esto, pero tu servidor ya no es premium")
      gp.delete(sv)
  }else{
    message.channel.send("No existe ese subcomando!")
    }
}