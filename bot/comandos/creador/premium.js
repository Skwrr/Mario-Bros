module.exports = {
  name: "premium",
  description: "Obten informacion sobre el estado premium de tu servidor",
  use: "",
  category: 'creador',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const gp = new db.crearDB("premium")
  let premium = gp.has(message.guild.id)
  if(!args[0]){
    if(!premium) return message.reply("Tu servidor necesita ser premium para ejecutar este comando, puedes adquirirlo mandandole un mensaje a mi creador")
    message.channel.send("Hay distintos argumentos; `add` y `remove`")
  }
    if(args[0] === 'add' || args[0] === 'añadir'){
      const staff = process.env.OWNERS_ID
      if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
      var guild = client.guilds.cache.get(args[1])
      var sv = args[1]
      if(args[1] === 'this') {
        guild = client.guilds.cache.get(message.guild.id);
        sv = message.guild.id;
      }
      
      if(!guild) return message.reply("Escriba la id de algun servidor en el que yo esté")
      if(premium){
        message.reply("Ese servidor ya es premium")
        return
      }
      let cate = guild.channels.cache.find(c => c.name == "anuncios" && c.type == "text");
      if (!cate) {
    guild.channels.create("anuncios", {
      type: "text"
    }).then(c => {
      c.send("Hola! Vengo a avisar que tu servidor ha sido activado como premium ¡FELICIDADES!\nContacta con mi creador para recibir la recompensa")
      return gp.set(sv, "true")
      return
    })
      }
      cate.send("Hola! Vengo a avisar que tu servidor ha sido activado como premium ¡FELICIDADES!\nContacta con mi creador para recibir la recompensa")
      gp.set(sv, "true")
    
  }else if(args[0] === 'remove' || args[0] === 'delete' || args[0 === 'borrar']){
    if(message.author.id != process.env.OWNER_ID  && message.author.id !== "692363394719809577") return message.reply('Tu no eres mi dueño, no tienes permiso a este comando')
      var guild = client.guilds.cache.get(args[1])
      var sv = args[1]
      if(args[1] === 'this') {
        guild = client.guilds.cache.get(message.guild.id);
        sv = message.guild.id;
      }
      if(!guild) return message.reply("Escriba la id de algun servidor en el que yo esté")
      if(!premium){
        message.reply("Ese servidor no es premium")
        return
      }
      let cate = guild.channels.cache.find( c => c.name == "anuncios" && c.type == "text");
      if (!cate) {
    guild.channels.create("anuncios", {
      type: "text"
    }).then(c => {
      c.send("Hola! Siento mucho decir esto, pero tu servidor ya no es premium")
      return gp.delete(sv)
      return
    })
      }
      cate.send("Hola! Siento mucho decir esto, pero tu servidor ya no es premium")
      gp.delete(sv)
  }else{
    message.channel.send("No existe ese subcomando!")
    }
  }
}