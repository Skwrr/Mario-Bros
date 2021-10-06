const db = require("megadb")
module.exports = {
  name: "shop",
  description: "Compra algo",
  use: "[buy/item] (item)",
  category: 'economia',
  alias: ["buy"],
  async run(client, message, args) {
    function betterInt(int){
      if(!int) throw new Error("Falta numero")
      if(int > 999999999) int = (int/1000000000).toFixed(2)+"B"
      if(int > 999999) int = (int/1000000).toFixed(2)+"M"
      if(int > 999) int = (int/1000).toFixed(2)+"k"

      return int
    }
    const Discord = require("discord.js")
  let store = new db.crearDB("store")
  
  if(!store.has(message.guild.id)){
    store.set(message.guild.id, [
      {
        "item": "PremiumBOT",
        "precio": 2000000000,
      }
    ])
  }
  let guild = message.guild.id
  if(!args[0]){
    let items = await store.get(guild)
    const embed = new Discord.MessageEmbed()
    .setTitle("Store")
    .setColor("RANDOM")
    console.log(items)
    let i = 0
    while(i < items.length){
      console.log(items[i])
      embed.addField(items[i].item, betterInt(items[i].precio).toString())
      i++
    }
    return message.channel.sendEmbed(embed)
  }
  if(args[0] !== 'buy'){
    let precio
    let i = 0
    let items = await store.get(guild)
    while(i < items.length){
      precio = items[i]
      if(precio.item === args[0]) {
        const embed = new Discord.MessageEmbed()
          .setTitle(args[0].toUpperCase())
          .addField("Precio", betterInt(precio.precio).toString())
          .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
      }
      i++
    }
    return message.reply("Ese objeto no existe")
  }else
  if(args[0] === "buy"){
    if(!args[1]) return message.reply("Escriba el nombre del item")
    let precio
    let i = 0
    let items = await store.get(guild)
    while(i < items.length){
      precio = items[i]
      if(precio.item === args[1]) {
        const {MessageButton: mb, MessageActionRow: mr} = require("discord.js")
        let btn1 = new mb().setStyle("SUCCESS").setLabel("Si").setCustomId("yes")
        let btn2 = new mb().setStyle("DANGER").setLabel("No").setCustomId("no")
        let row = new mr().addComponents([btn1, btn2])
        const embed = new Discord.MessageEmbed()
          .setTitle(args[1].toUpperCase())
          .setDescription("Seguro que quieres comprar esto?")
          .addField("Precio", betterInt(precio.precio).toString())
          .setColor("RANDOM")
        return message.channel.send({embeds: [embed], components: [row]}).then(m => {
          let pressed = 0
          let filter = async(btn) => {
            if(pressed >= 1) return btn.reply({content: "Ya has presioado ese botón", ephemeral: true})
            if(btn.user.bot) return
            if(btn.user.id !== message.author.id) return btn.reply({content: "No puedes usar eso", ephemeral: true})
            if(btn.customId === "no") {
              pressed++
              return btn.reply("Has rechazado la compra")
            }
            if(btn.customId === "yes") {
              let usermoney = await new db.crearDB("economy").get(message.author.id)
              if(usermoney.cash < precio.precio) return btn.reply("No tienes suficiente dinero")
              if(precio.item === "PremiumBOT") {
                let premiumdb = new db.crearDB("premium")
                let guild = message.guild
                if(!premiumdb.has(guild.id)) {
                  btn.reply("Has comprado "+args[1])
                  premiumdb.set(guild.id, "true")
                  new db.crearDB("economy").restar(message.author.id+".cash", precio.precio)
                } else btn.reply("Tu servidor ya era premium")
                return pressed++
              }
              btn.reply("Has comprado "+args[1]+", pero no puedes hacer nada").then(() => new db.crearDB("economy").restar(message.author.id+".cash", precio.precio))
              pressed++
            }
          }
          m.awaitMessageComponent({filter, componentType: "BUTTON", max: 1, time: 20000, errors: ['time']}).catch(error => {
            message.reply("Se ha acabado el tiempo")
          })
        })
      }
      i++
    }
    return message.reply("Ese objeto no existe")
  }else message.reply("Ese argumento no existe")
  
},
  SlashCommand: {
    options: [
    {
      name: "itemorbuy",
      description: "Muestra información sobre el item",
      type: "STRING",
      required: false,
    },
    {
      name: "itemtobuy",
      description: "Compra el item",
      type: "STRING",
      required: false,
    }
    ],
    async run(client, message, args){
      function betterInt(int){
      if(!int) throw new Error("Falta numero")
      if(int > 999999999) int = (int/1000000000).toFixed(2)+"B"
      if(int > 999999) int = (int/1000000).toFixed(2)+"M"
      if(int > 999) int = (int/1000).toFixed(2)+"k"

      return int
    }
    const Discord = require("discord.js")
  let store = new db.crearDB("store")
  
  if(!store.has(message.guild.id)){
    store.set(message.guild.id, [
      {
        "item": "PremiumBOT",
        "precio": 2000000000,
      }
    ])
  }
  let guild = message.guild.id
  if(!args.getString("itemorbuy")){
    let items = await store.get(guild)
    const embed = new Discord.MessageEmbed()
    .setTitle("Store")
    .setColor("RANDOM")
    console.log(items)
    let i = 0
    while(i < items.length){
      console.log(items[i])
      embed.addField(items[i].item, betterInt(items[i].precio).toString())
      i++
    }
    return message.reply({embeds: [embed]})
  }
  if(args.getString("itemorbuy") !== "buy"){
    let precio
    let i = 0
    let items = await store.get(guild)
    while(i < items.length){
      precio = items[i]
      if(precio.item === args.getString("itemorbuy")) {
        const embed = new Discord.MessageEmbed()
          .setTitle(args.getString("itemorbuy").toUpperCase())
          .addField("Precio", betterInt(precio.precio).toString())
          .setColor("RANDOM")
        return message.reply({embeds: [embed]})
      }
      i++
    }
    return message.reply("Ese objeto no existe")
  }else
  if(args.getString("itemorbuy") === "buy"){
    if(!args.getString("itemtobuy")) return message.reply({content:"Escriba el nombre del item", ephemeral: true})
    let precio
    let i = 0
    let items = await store.get(guild)
    while(i < items.length){
      precio = items[i]
      if(precio.item === args.getString("itemtobuy")) {
        message.reply({content: "Has ejecutado el comando `shop`", ephemeral: true})
        const {MessageButton: mb, MessageActionRow: mr} = require("discord.js")
        let btn1 = new mb().setStyle("SUCCESS").setLabel("Si").setCustomId("yes")
        let btn2 = new mb().setStyle("DANGER").setLabel("No").setCustomId("no")
        let row = new mr().addComponents([btn1, btn2])
        const embed = new Discord.MessageEmbed()
          .setTitle(args.getString("itemtobuy").toUpperCase())
          .setDescription("Seguro que quieres comprar esto?")
          .addField("Precio", betterInt(precio.precio).toString())
          .setColor("RANDOM")
        return message.channel.send({embeds: [embed], components: [row]}).then(m => {
          let pressed = 0
          let filter = async(btn) => {
            if(pressed >= 1) return btn.reply({content: "Ya has presionado ese botón", ephemeral: true})
            if(btn.user.bot) return
            if(btn.user.id !== message.user.id) return btn.reply({content: "No puedes usar eso", ephemeral: true})
            if(btn.customId === "no") {
              pressed++
              return btn.reply("Has rechazado la compra")
            }
            if(btn.customId === "yes") {
              let usermoney = await new db.crearDB("economy").get(message.user.id)
              if(usermoney.cash < precio.precio) return btn.reply("No tienes suficiente dinero")
              if(precio.item === "PremiumBOT") {
                let premiumdb = new db.crearDB("premium")
                let guild = message.guild
                if(!premiumdb.has(guild.id)) {
                  btn.reply({content:"Has comprado "+args.getString("itemtobuy"), ephemeral: true})
                  premiumdb.set(guild.id, "true")
                  new db.crearDB("economy").restar(message.user.id+".cash", precio.precio)
                } else btn.reply({content: "Tu servidor ya era premium", ephemeral: true})
                return pressed++
              }
              btn.reply({content: "Has comprado "+args.getString("itemtobuy")+", pero no puedes hacer nada", ephemeral: true}).then(() => new db.crearDB("economy").restar(message.user.id+".cash", precio.precio))
              pressed++
            }
          }
          m.awaitMessageComponent({filter, componentType: "BUTTON", max: 1, time: 20000, errors: ['time']}).catch(error => {
            message.channel.send({content:"Se ha acabado el tiempo"})
          })
        })
      }
      i++
    }
    return message.reply("Ese objeto no existe")
  }else message.reply("Ese argumento no existe")
    }
  }
}