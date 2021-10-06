module.exports = {
  name: "chess",
  category: "diversion",
  use: "(@user)",
  description: "Juega al ajedrez con algun amigo",
  alias: ["ajedrez"],
  async run(client, message, args, db){
    const Discord = require("discord.js")
    // let mentioned = message.mentions.member.first()
    // if(!mentioned) return message.reply("Debes mencionar a un usuario")
    let wb = ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜"]
    let row, column, tablero = []
    row = 8, column = 8
    for (let i = 0; i < column+1; i++) {
        tablero[i] = new Array(column+1)
        for (let e = 0; e < row+1; e++) {
            tablero[i][e] = new Array(row+1)
        }
    }
    for (let i = 0; i < row+1; i++) {
        y = i
        for (let e = 0; e < column+1; e++) {
            tablero[0][0] = " "
            if (e === 0) tablero[y][e] = y
            if (e === 8) y++
            if (e === 7) y++
            if (e === 6) y++
            if (e === 5) y++
            if (e === 4) y++
            if (e === 3) y++
            if (e === 2) y++
            if (e > 1) y++
            tablero[e][i] = wb[e + y]
            tablero[0][e] = `${e} `
        }
    }
    //White Pieces
    tablero[8][5] = "♔"
    tablero[8][4] = "♕"
    tablero[8][3] = "♗"
    tablero[8][6] = "♗"
    tablero[8][2] = "♘"
    tablero[8][7] = "♘"
    tablero[8][1] = "♖"
    tablero[8][8] = "♖"
    for(let pawnpos = 1; pawnpos < column+1; pawnpos++) tablero[7][pawnpos] = "♙"
    //Black Pieces
    tablero[1][5] = "♚"
    tablero[1][4] = "♛"
    tablero[1][3] = "♝"
    tablero[1][6] = "♝"
    tablero[1][2] = "♞"
    tablero[1][7] = "♞"
    tablero[1][1] = "♜"
    tablero[1][8] = "♜"
    for(let pawnpos = 1; pawnpos < column+1; pawnpos++) tablero[2][pawnpos] = "♟︎"
    let actual = tablero.map(x => x.join("")).join("\n")
    const embed = new Discord.MessageEmbed()
    .setTitle(`Partida de ${message.author.username}`)
    .setDescription(`\`\`\`${actual.toString()}\`\`\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Gracias a los que ayudaron con este comando")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    message.channel.send({embeds: [embed]}).then(m => {
      let { findnext } = require("../functions")
      let filter = a => a.author.id === message.author.id /*&& a.author.id === mentioned.user.id*/ && !a.author.bot
      let collector = m.channel.createMessageCollector({filter})
      collector.on("collect", msg => {
        let sepo = msg.content.split("|")
        if(!sepo[1] || sepo[2]) return msg.reply("Debes poner 4 numeros separados por `,` y en medio poner un | (1,1|2,2)")
        let sep = sepo[0].split(",")
        let sep2 = sepo[1].split(",")
        if(sep.includes("9") || sep2.includes("9") || sep.includes("0") || sep2.includes("0")) return msg.reply("No puedes establecer una ficha fuera de los limites")
        if(!sep2[1]) return msg.reply("Debes escribir las posiciones (2,1|3,1)")
        if(tablero[sep[0]][sep[1]] !== tablero[sep2[0]][sep2[1]]) {
          if(msg.author.id === message.author.id) {
            let piezas = ["♚","♛","♝","♞","♜", "♟︎", "⬜", "⬛"]
            piezas.forEach(pieza => {
              if(tablero[sep[0]][sep[1]] === pieza) {
                if(msg.author.id === message.author.id) return msg.reply("Esas coordenadas son de una ficha que no es tuya")
              }
            })
            piezas = ["♔","♕","♗","♘","♖", "♙"]
            piezas.forEach(pieza => {
              if(tablero[sep[0]][sep[1]] === pieza) {
                if(msg.author.id !== message.author.id) return msg.reply("Esas coordenadas son de una ficha que no es tuya")
                if(pieza === "♙"){
                  if(parseInt(sep[0]-1) !== parseInt(sep2[0])) return msg.reply("No puedes mover esa ficha ahí")
                }else
                if(pieza === "♘"){
                  if(tablero[sep[0]][sep[1]] !== tablero[parseInt(sep2[0])+2][parseInt(sep2[1])-1]) return msg.reply("No puedes mover esa ficha ahí")
                }
                let nextpieza = findnext(tablero, sep, sep2)
                if(!nextpieza) return msg.reply("Esas coordenadas contienen una posición que no es válida")
                tablero[sep2[0]][sep2[1]] = tablero[sep[0]][sep[1]]
                tablero[sep[0]][sep[1]] = nextpieza
                actual = tablero.map(x => x.join("")).join("\n")
                embed.setDescription(`\`\`\`${actual.toString()}\`\`\``)
                return m.edit({embeds: [embed]})
              }
            })
          }
        }else msg.reply("Esas coordenadas no son validas")
      })
    })
  }
}