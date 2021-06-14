module.exports = {
  name: "nitro",
  description: "Genera codigos de nitro",
  use: "(num)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const db = require("megadb")
  const premium = new db.crearDB("premium")
  if(!premium.has(message.guild.id)) return message.reply("Tu servidor no es premium, para usar este comando, contacta con mi creador para hacer un trato y hacer tu servidor premium")
  const cantidad = args[0]
  if(!cantidad || isNaN(cantidad)) return message.reply("Escriba un numero")
  let cn = new db.crearDB("cooldown")
  const cantidada = await cn.get(message.author.id)
  if(cn.has(message.author.id)) return message.channel.send("Tienes que esperar "+((1.5*cantidada)+1)+" segundos exactamente para poder usar este comando de vuelta")
  cn.set(message.author.id, cantidad)
  setTimeout(function(){
    cn.delete(message.author.id)
  }, ((1.5*cantidad)+1)*1000)

  let code = [
    "A","a","1",
    "B","b","2",
    "C","c","3",
    "D","d","4",
    "E","e","5",
    "F","f","6",
    "G","g","7",
    "H","h","8",
    "I","i","9",
    "J","j","0",
    "K","k",
    "L","l",
    "M","m",
    "N","n",
    "O","o",
    "P","p",
    "Q","q",
    "R","r",
    "S","s",
    "T","t",
    "U","u",
    "V","v",
    "W","w",
    "X","x",
    "Y","y",
    "Z","z"
  ]
  for (let i=0;i<cantidad;i++){
    if(i<cantidad){
      let cde1 = code[Math.floor(Math.random() * code.length)]
      let cde2 = code[Math.floor(Math.random() * code.length)]
      let cde3 = code[Math.floor(Math.random() * code.length)]
      let cde4 = code[Math.floor(Math.random() * code.length)]
      let cde5 = code[Math.floor(Math.random() * code.length)]
      let cde6 = code[Math.floor(Math.random() * code.length)]
      let cde7 = code[Math.floor(Math.random() * code.length)]
      let cde8 = code[Math.floor(Math.random() * code.length)]
      let cde9 = code[Math.floor(Math.random() * code.length)]
      let cde10 = code[Math.floor(Math.random() * code.length)]
      let cde11 = code[Math.floor(Math.random() * code.length)]
      let cde12 = code[Math.floor(Math.random() * code.length)]
      let cde13 = code[Math.floor(Math.random() * code.length)]
      let cde14 = code[Math.floor(Math.random() * code.length)]
      let cde15 = code[Math.floor(Math.random() * code.length)]
      let cde16 = code[Math.floor(Math.random() * code.length)]
      message.author.send(`Codigo Nitro -> https://discord.gift/${cde1}${cde2}${cde3}${cde4}${cde5}${cde6}${cde7}${cde8}${cde9}${cde10}${cde11}${cde12}${cde13}${cde14}${cde15}${cde16}`)
      continue;
    }
  }
  message.channel.send("Se han generado "+cantidad+" Nitros")
}
}