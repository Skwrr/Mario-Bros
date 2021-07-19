module.exports = {
  name: "t", 
  description: "Genera un mensaje con el formato <t:>", 
  use: "(Time1 in ms) [Time2 in ms] [act(\"+\"/\"-\"]", 
  category: "diversion", 
  alias: ["time"], 
  async run(client, message, args){
    const {t} = require("../creador/eval")
    try{
      const ms = require("ms")
      let p1 = args[0]
      let p2 = args[1]
      let p3 = args[2]
      if(p1 && p2 && p3){
        if("Date.now()".includes(p1)) p1.replace("Date.now()", Date.now())
        if("Date.now()".includes(p2)) p2.replace("Date.now()", Date.now())
        if(p3!=="+"&&p3!=="-") return message.reply("Solo se puede sumar y restar")
        message.channel.send(t(p1, p2, p3))
      }else
      if(p1){
         if("Date.now()".includes(p1)) p1.replace("Date.now()", Date.now())
        message.channel.send(t(p1)) 
      }
      if(p1 && p2){
        if("Date.now()".includes(p1)) p1.replace("Date.now()", Date.now())
        if("Date.now()".includes(p2)) p2.replace("Date.now()", Date.now())
        message.channel.send(t(p1, p2))
      }
    }catch(error) {
      message.channel.send(error.message)
    }
  }
}