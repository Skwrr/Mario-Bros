module.exports = {
  name: "shitpost",
  description: "Memes pero mas graciosos",
  use: "",
  category: "diversion",
  premium: true,
  alias: ["chispop", "monke"],
  async run(client, message, args){
    let shitpost = require("discord-shitpost") 
    message.reply(shitpost.allShitpost())
  }
}