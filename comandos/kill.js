const Fresa = require("fresaapi");
const fresa = new Fresa.FresaApi("$2a$10$GrMSWgvAxyFexWjB5ozNjOf8dWKFWeIEBZbpF.iLDf0mUR7MmJVPq");
module.exports = async(client, message, args) => {
  let kill = await fresa.kill()

message.channel.send(`**${message.author} a matado a ${args[0]}**`)
  setTimeout(() => {
    
  
message.channel.send({files: [kill]})
}, 10)
  }