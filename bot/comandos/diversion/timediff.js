module.exports = {
  name: "timediff",
  description: "Mustra cuanto tiempo hay de diferencia entre 2 mensajes",
  use: "(id1) (id2)",
  category: "diversion",
  alias: [],
  async run(client, message, args){
    const { timediff } = require("../creador/eval")
    try{
      let m1 = message.channel.messages.resolve(args[0])
      let m2 = message.channel.messages.resolve(args[1])
      message.channel.send(timediff(m1, m2))
    }catch(error){
      message.channel.send(error.message)
    }
  }
}