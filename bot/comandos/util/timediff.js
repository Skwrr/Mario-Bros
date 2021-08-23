module.exports = {
  name: "timediff",
  description: "Mustra cuanto tiempo hay de diferencia entre 2 mensajes",
  use: "(id1) (id2)",
  category: "util",
  alias: [],
  async run(client, message,args){
    function timediff(m1, m2) {
      const ms = require('@fabricio-191/ms')
      if(!m1) throw new Error("Falta la id del mensaje inicial")
      if(!m2) throw new Error("Falta id del mensaje final")
      return ms(m2.createdTimestamp-m1.createdTimestamp, {long: false, language: 'es'});
    }
    try{
      let m1 = message.channel.messages.fetch(args[0])
      let m2 = message.channel.messages.fetch(args[1])
      message.channel.send(timediff(m1, m2))
    }catch(error){
      message.channel.send(error.message)
    }
  }
}