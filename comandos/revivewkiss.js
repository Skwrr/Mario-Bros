const Fresa = require("fresaapi");
const fresa = new Fresa.FresaApi("$2a$10$GrMSWgvAxyFexWjB5ozNjOf8dWKFWeIEBZbpF.iLDf0mUR7MmJVPq");
module.exports = async(client, message, args) => {
  let kiss = await fresa.kiss()

message.channel.send(`**${message.author} a revivido con un beso a ${args[0]}**`)
  setTimeout(() => {
    
  
message.channel.send({files: [kiss]})
}, 1000)
  }