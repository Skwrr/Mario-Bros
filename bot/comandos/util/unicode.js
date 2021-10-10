module.exports = {
  name: "unicode",
  description: "Convierte cualquier cosa en Unicode",
  category: "util",
  use: "(replaceAll/texto) [inverse]",
  alias: [],
  cooldown: 10,
  premium: true,
  async run(client, message, args){
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No tienes permisos para ejecutar ese comando, necesitas `MANAGE_CHANNELS`")
    let {a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z} = require("../functions").unicode
    let arr = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]
    let arr2 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if(!args.join(" ")) return message.reply("Escribe algún texto")
    if(args[0] == "replaceAll"){
      try{
      let namo = message.guild.name
      for(const ch of [...message.guild.channels.cache.values()]){
      //message.guild.channels.cache.forEach(ch => {
        let name = ch.name
        let aa = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]
        let bb = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        if(args[1] && args[1] == "inverse") {
          aa = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
          bb = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]
        }
        for (let i = 0; i <  aa.length; i++){
          name = name.replaceAll(bb[i], aa[i])
          namo = namo.replaceAll(bb[i], aa[i])
        }
        ch.setName(name)
      }
      //})
      message.guild.setName(namo)
      return message.reply(`Proceso terminado`)
    }catch(err){
      console.log(err.message)
      setTimeout(() => {
        message.reply(err.message)
      }, err.timeout*1.5)
    }
    }
    let texto = args.join(" ")
    for(let i = 0; i < arr.length; i++){
      texto = texto.replaceAll(arr2[i], arr[i])
    }
    message.reply(`\`\`\`\n${texto}\n\`\`\``)
  }
}