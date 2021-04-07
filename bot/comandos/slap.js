const Fresa = require("fresaapi");
const fresa = new Fresa.FresaApi("$2a$10$GrMSWgvAxyFexWjB5ozNjOf8dWKFWeIEBZbpF.iLDf0mUR7MmJVPq");
module.exports = async(client, message, args) => {
  let slap = await fresa.slap()

message.channel.send(`**${message.author} a pegado a ${args[0]}**\n`)
setTimeout(() => {
  

message.channel.send({files: [slap]})
}, 10)
}