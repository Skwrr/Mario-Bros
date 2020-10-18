module.exports = (client, message, args, Discord) => {
  if(!args[0]) return message.channel.send("Opciones: `piedra`, `papel` o `tijera`")

let opciones = ["piedra", "papel", "tijera"]
if(!opciones.includes(args[0].toLowerCase())) return message.channel.send("¡Opción invalida!")

if(args[0] == 'piedra') {
  let random = ["¡Ganaste! Has elejido `piedra` y yo elegí `tijera`.", //win
                "¡Gané!, Has elejido `piedra` y yo elegí `papel`.", //loser
                "Empate. Has elejido `piedra` y yo elegí `piedra`."] //draw
  
  message.reply(` ${random[Math.floor(Math.random() * random.length)]}`)

 }

if(args[0] == 'papel') {
  let random2 = ["¡Gané!. Has elejido `papel` y yo elegí `tijera`", //loser
                 "Empate. Has elejido: `papel` Y yo elegí `papel`.", //draw
                 "¡Ganaste!. Has elejido `papel` y yo elegí `piedra`."] //win
  
  message.reply(` ${random2[Math.floor(Math.random() * random2.length)]}`)

 }

if(args[0] == 'tijera') {
  let random3 = ["Empate. Has elejido: `tijera` y yo elegí `tijera`.", //draw
                 "¡Ganaste!. Has elejido `tijera` y yo elegí `papel`.", //win
                 "¡Gané!. Has elejido `tijera` y yo elegí `piedra`."] //loser
  
  message.reply(` ${random3[Math.floor(Math.random() * random3.length)]}`)
 }

}