module.exports = {
  name: "c4",
  description: "Juega al connecta4",
  use: "(@user)",
  category: "diversion",
  alias: ["connect4"],
  async run(client, message, args, db){
    let mdb = new db.memoDB("activec4")
    let { MessageActionRow: mar, MessageButton: mb } = require("discord.js")
    let member = message.member,
    mention = message.mentions.members.first() || message.guild.members.resolve(args[0])

    let size = 5

    if(!mention) return message.reply("Debes mencionar a alguien")
    if(mention.user.id == client.user.id) return message.reply("Ojalá puediera...")
    if(mention.user.bot) return message.reply("No puedes jugar contra un bot")
    if(mention.user.id == member.id) return message.reply("Como vas a jugar contra tí mismo?")

    let row0 = new mar(),
    row1 = new mar(),
    row2 = new mar(),
    row3 = new mar(),
    row4 = new mar()
    btn = []
    for(let i = 0; i < size*size; i++){
      btn.push(new mb().setStyle("SECONDARY").setLabel("?").setCustomId(`slot${i}`))
    }
    if(mdb.has(message.channel.id)) return message.reply("Ya se está jugando una partida en este canal")
    else mdb.set(message.channel.id, "true")
    row0.addComponents([btn[0], btn[1], btn[2], btn[3], btn[4]])
    row1.addComponents([btn[5], btn[6], btn[7], btn[8], btn[9]])
    row2.addComponents([btn[10], btn[11], btn[12], btn[13], btn[14]])
    row3.addComponents([btn[15], btn[16], btn[17], btn[18], btn[19]])
    row4.addComponents([btn[20], btn[21], btn[22], btn[23], btn[24]])
    let row = [row0, row1, row2, row3, row4]
    let turnonum = 0
    let turno = member
    let pressed = 0

          message.channel.send({content: "Turno de "+turno.user.username, components: row}).then(async m => {
            let filter = (btn) => {
              pressed++

                if(turnonum == 0) turno = member
                else if(turnonum == 1) turno = mention

                

                let ficha, style
                if(turnonum == 0) ficha = "x"
                else ficha = "o"
                if(turnonum == 0) style = "PRIMARY"
                else style = "DANGER"

                if(btn.user.id !== turno.user.id) return btn.reply({content: `No es tu turno`, ephemeral: true})

                let btns = [m.components[0].components, m.components[1].components, m.components[2].components, m.components[3].components, m.components[4].components],
                btna = new Array(size).fill(new Array(size))

                btna = btns

                if(btn.customId == "slot0"){
                  btna[0][0] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[0][0].customId)
                }else
                if(btn.customId == "slot1"){
                  btna[0][1] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[0][1].customId)
                }else
                if(btn.customId == "slot2"){
                  btna[0][2] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[0][2].customId)
                }else
                if(btn.customId == "slot3"){
                  btna[0][3] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[0][3].customId)
                }else
                if(btn.customId == "slot4"){
                  btna[0][4] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[0][4].customId)
                }else
                if(btn.customId == "slot5"){
                  btna[1][0] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[1][0].customId)
                }else
                if(btn.customId == "slot6"){
                  btna[1][1] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[1][1].customId)
                }else
                if(btn.customId == "slot7"){
                  btna[1][2] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[1][2].customId)
                }else
                if(btn.customId == "slot8"){
                  btna[1][3] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[1][3].customId)
                }else
                if(btn.customId == "slot9"){
                  btna[1][4] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[1][4].customId)
                }else
                if(btn.customId == "slot10"){
                  btna[2][0] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][0].customId)
                }else
                if(btn.customId == "slot11"){
                  btna[2][1] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][1].customId)
                }else
                if(btn.customId == "slot12"){
                  btna[2][2] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][2].customId)
                }else
                if(btn.customId == "slot13"){
                  btna[2][3] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][3].customId)
                }else
                if(btn.customId == "slot14"){
                  btna[2][4] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][4].customId)
                }else
                if(btn.customId == "slot15"){
                  btna[3][0] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[3][0].customId)
                }else
                if(btn.customId == "slot16"){
                  btna[3][1] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[2][1].customId)
                }else
                if(btn.customId == "slot17"){
                  btna[3][2] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[3][2].customId)
                }else
                if(btn.customId == "slot18"){
                  btna[3][3] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[3][3].customId)
                }else
                if(btn.customId == "slot19"){
                  btna[3][4] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[3][4].customId)
                }else
                if(btn.customId == "slot20"){
                  btna[4][0] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[4][0].customId)
                }else
                if(btn.customId == "slot21"){
                  btna[4][1] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[4][1].customId)
                }else
                if(btn.customId == "slot22"){
                  btna[4][2] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[4][2].customId)
                }else
                if(btn.customId == "slot23"){
                  btna[4][3] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[4][3].customId)
                }else
                if(btn.customId == "slot24"){
                  btna[4][4] = new mb().setLabel(ficha).setStyle(style).setDisabled(true).setCustomId(btns[4][4].customId)
                }else btn.reply({content: "Watafak, un boton inexistente", ephemeral: true})

                
                row0 = new mar(),
                row1 = new mar(),
                row2 = new mar(),
                row3 = new mar(),
                row4 = new mar()

                row0.addComponents(btna[0])
                row1.addComponents(btna[1])
                row2.addComponents(btna[2])
                row3.addComponents(btna[3])
                row4.addComponents(btna[4])

                if(turnonum == 0) turnonum++
                else turnonum--

                if(turnonum == 0) turno = member
                else turno = mention

                btn.deferUpdate()
                m.edit({content: "Turno de "+turno.user.username, components: [row0, row1, row2, row3, row4]})
                let {checker} = require("connect4-discord")
                let status = new checker(btna, turno)
                if(status.status == "end") {
                  mdb.delete(message.channel.id)
                  let wonmoney = Math.floor(Math.random() * 2000)
                  let dinero = new db.crearDB("economy")
                  if(!dinero.has(status.member.id)) dinero.set(status.member.id, {cash: 0, bank: 0})
                  dinero.add(status.member.id+".cash", wonmoney)
                  return m.edit({content: `${status.member} HA GANADO LA PARTIDA!! (Gana ${wonmoney})`})
                }
                if(pressed == size*size) return m.edit({content: `Hubo un EMPATE`, components: []})
              }
              // let filtro = (r,u) => {
              //   if(u.bot) return
              //   if(r.emoji.name == "👍"){
              //     return m.edit({content: "Alguien ha acabado la partida", components: []})
              //   }
              // }
              // await m.react("👍")
              // m.awaitReactions({filtro, time: 300000}).catch(err => {
              //   if(err.message.includes("time")) m.edit({content: "Se acabó el tiempo, hubo empate", components: []})
              //   else m.edit({content: err.message, components: []})
              // })
            m.awaitMessageComponent({filter, componentType: "BUTTON", time: 300000}).catch((err) => {
              if(err.message.includes("time")) m.edit({content: "Se acabó el tiempo, hubo empate", components: []})
              else m.edit({content: err.message, components: []})
            })
          })
  }
}