module.exports = {
  name: "eval",
  description: "Evalua algo como si fuera un comando",
  use: "(code)",
  category: 'creador',
  alias: ["e"],
  async run(client, message, args) {
    const db = require("megadb")
    const Discord = require("discord.js")
    const staff = process.env.OWNERS_ID
    if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")

    const jsp = require('jspaste')


    async function enviar(mensaje) {
      return await message.channel.send(mensaje)
    }

    async function exec(codigo) {
      return await require("child_process").execSync(codigo)
    }

    
    
    

    
    
    function mayuscula(string) {
      string = string.replace(/[^a-z]/gi, '')
      return string[0].toUpperCase()+string.slice(1)
    }
    let ms = require("ms")
    
    function timediff(m1, m2) {
      m1 = message.channel.messages.resolve(m1)
      m2 = message.channel.messages.resolve(m2)
      if(!m1) throw new TypeError("Falta la id del mensaje inicial")
      if(!m2) throw new TypeError("Falta id del mensaje final")
      try{
        return ms(parseInt(m2.createdTimestamp)-parseInt(m1.createdTimestamp));
      }catch(error){
        throw new Error(error.message)
      }
    }
    
    function t(msc, ov, act){
      if(!ov) {
        msc = Math.floor(msc/1000) 
        return "<t:"+msc+">"
      }else{
        if(act === "-"){
          msc = parseInt(msc) - parseInt(ov) 
          msc = Math.floor(msc/1000) 
          return "<t:"+msc+">"
        }else if(act === "+"){
          msc = parseInt(msc) + parseInt(ov)
          return ov, msc
          msc = Math.floor(msc/1000)
          return "<t:"+msc+">"
        }else{
          throw new Error("Solo se puede sumar y restar")
        }
      }
    }

    let tiempo1 = Date.now()
    
    if(!args[0]) return message.reply("Escriba algo a __evaluar__")
    if(args.join(" ").toLowerCase().includes("token")) return message.channel.send("NO TOQUES MI TOKEN ***P U T O***")

    const edit = new Discord.MessageEmbed()
    .setDescription(":stopwatch: Evaluando...")
    .setColor("#7289DA")
    message.channel.send({embeds: [edit]}).then(async msg => {
      try {
        let code = args.join(" ");
        let evalued = await eval(`(async() => {${code}})()`);
        let tipo = typeof evalued||"Tipo no encontrado."
        if (typeof evalued !== 'string') evalued = require('util').inspect(evalued, { depth: 0, maxStringLength: 2000});
        let txt = "" + evalued;
    

    
        if (txt.length > 1048) {

          let link = await jsp.publicar(`- - - - Eval - - - -\n\n${txt.replace(client.token, "Wow, un token")}`)
            
            require("beautify")(args.join(" "), {format: 'js'})
          const embed = new Discord.MessageEmbed()
          .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
          .addField(":outbox_tray: Salida", `\`El codigo es muy largo, link:\` ${link.url}`)
          .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
          .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
          .setColor("#7289DA")
          msg.edit({
            content: "** **",
            embeds: [embed]
          });
                
        
        } else {
    

                require("beautify")(args.join(" "), {format: 'js'})
    
          const embed = new Discord.MessageEmbed()
          .addField(":inbox_tray: Entrada", `\`\`\`js\n${require("beautify")(code, {format: 'js'})}\n\`\`\``)
          .addField(":outbox_tray: Salida", `\`\`\`js\n${txt.replace(client.token, "No quieres saber eso.")}\n\`\`\``)
          .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
          .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
          .setColor("#7289DA")
          msg.edit({
            content: "** **",
            embeds: [embed]
          });
        }
      } catch (err) {          
        let code = args.join(" ")
        const embed = new Discord.MessageEmbed()
        .setAuthor("Error en el eval", client.user.displayAvatarURL({dynamic : true}))
        .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: Salida", `\`\`\`js\n${err}\n\`\`\``)
        .addField(":file_folder: Tipo", `\`\`\`js\nError\n\`\`\``)
        .setColor("RED")
        msg.edit({
            content: "** **",
            embeds: [embed]
          });
      }
    })
  },
  t: function(msc, ov, act){
      if(!msc){
        throw new Error("No se recibió primer argumento")
      }else
      if(!ov) {
        if(msc === "Date.now()") msc = Date.now()
        msc = Math.floor(parseInt(msc)/1000) 
        if(isNaN(msc)) throw new Error("No se pudo generar")
        return "<t:"+parseInt(msc)+">"
      }else
      if(ov){
        if(msc === "Date.now()") msc = Date.now()
        if(ov === "Date.now()") ov = Date.now()
        if(act === "-"){
          msc = parseInt(msc)-parseInt(ov) 
          msc = Math.floor(parseInt(msc)/1000)
          if(isNaN(msc)) throw new Error("No se pudo generar")
          return "<t:"+parseInt(msc)+">"
        }else if(act === "+"){
          msc = parseInt(msc)
          ov = parseInt(ov)
          msc = msc+ov
          msc = Math.floor(parseInt(msc)/1000)
          if(isNaN(msc)) throw new Error("No se pudo generar")
          return "<t:"+parseInt(msc)+">"
        }
      }
    },
    timediff: function(m1, m2) {
      const ms = require('@fabricio-191/ms')
      if(!m1) throw new Error("Falta la id del mensaje inicial")
      if(!m2) throw new Error("Falta id del mensaje final")
      return ms(m2.createdTimestamp-m1.createdTimestamp, {long: false, language: 'es'});
    }
}