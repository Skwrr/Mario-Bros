module.exports = {
  name: "meme",
  description: "Obtén algún meme divertido",
  use: "",
  premium: false,
  alias: [],
  async run(client, message){
    try{
      message.channel.send({ files :  [require("discordimgs").randomMemeAll()] })
    }catch(error) {
      message.channel.send(error.message)
    }
  } 
}