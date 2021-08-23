module.exports = {
  name: "antiraid",
  description: "Modulo para detectar usuarios peligrosos en los servidores",
  use: "(add/remove/ban) (userid) (reason)",
  alias: [],
  category: "moderacion",
  async run(client, message, args){
    const db = require("megadb")
    const mmdb = require("manage-maliciousdb")
    if(!args[0]) return message.reply("Debes escribir como minimo 1 arg")
    if(args[0] === "ban"){
      let owners = process.env.OWNERS_ID
      if(!message.member.permissions.has("BAN_MEMBERS") || !message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("No puedes/puedo banear usuarios")
      let list = mmdb.getMaliciousArray()
      let arr = []
      let arr2 = []
      let arr3 = []
      client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(async member => {
          if(mmdb.findElementByID(member.id)) {
            if(member.bannable){
              let user = mmdb.findElementByID(member.id)
              console.log(await user)
              //member.ban({reason: `Usuario Malicioso:\nID: ${user.id}\nReason: ${user.razon}\nProof: ${user.prueba}`})
              if(arr.includes(member.id)) return
              arr.push(member.id)
            }else{
              if(!client.users.resolve(member.id)||client.users.resolve(member.id)===undefined) return
              if(arr2.includes(member.id)) return
              arr2.push(member.id)
            }
            arr3.push(member.id)
          }
        }) 
      }) 
            message.channel.send(`${arr3.length} usuarios cargados\n${parseInt(arr.length)} usuarios baneados y ${parseInt(arr2.length)} usuarios que no puedo banear`)
          
        
    }else{
      message.reply("Argumento no valido")
    }
  }
}