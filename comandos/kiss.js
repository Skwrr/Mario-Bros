const Fresa = require("fresaapi");
const fresa = new Fresa.FresaApi("$2a$10$GrMSWgvAxyFexWjB5ozNjOf8dWKFWeIEBZbpF.iLDf0mUR7MmJVPq");
module.exports = async(client, message, args) => {


  let kiss = await fresa.kiss()
  const besado = message.mentions.users.first()
  if(!besado) return message.reply("Menciona a algun usuario")
  if (besado === message.author){ 
    message.reply(`No te puedes besar a ti mismo... o si? O///.///O`)
    return true
  }

message.channel.send(`**${message.author} a besado a ${besado}**`)
  setTimeout(() => {
    
  
message.channel.send({files: [kiss]})
}, 10)
  }