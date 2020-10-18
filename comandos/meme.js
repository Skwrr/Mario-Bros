const Fresa = require("fresaapi");
const fresa = new Fresa.FresaApi("$2a$10$GrMSWgvAxyFexWjB5ozNjOf8dWKFWeIEBZbpF.iLDf0mUR7MmJVPq");
module.exports = async(client, message, args) => {
  const memedos = await fresa.meme()
  const memeo = [
    "https://cdn.discordapp.com/attachments/661403837881516033/740372655974252564/image0.png",
    "https://cdn.discordapp.com/attachments/661403837881516033/740375560076918975/video0-1-1-1.mp4",
    "https://cdn.discordapp.com/attachments/661403837881516033/740410417628840026/Proyecto_03-24_SD_1-1_2.mp4",
    "https://cdn.discordapp.com/attachments/741330158858010715/746044425406251098/unknown.png",
    "https://cdn.discordapp.com/attachments/741330158858010715/746044655237464104/unknown.png",
    "https://cdn.discordapp.com/attachments/741330158858010715/746045564210380860/unknown.png",
    "https://cdn.discordapp.com/attachments/741330158858010715/746045918855561257/unknown.png",
    "https://cdn.discordapp.com/attachments/741330158858010715/746046841233080340/unknown.png",
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    memedos,
    "https://cdn.discordapp.com/attachments/730785088777748558/760558101312569445/unknown.png"
  ]
  const meme = memeo[Math.floor(Math.random() * memeo.length)]
  console.log(meme)
  message.channel.send({files: [meme]}).catch(e => {
    message.channel.send(e)
  })
  
}