module.exports = {
  name: "eval",
  description: "Evalua algo como si fuera un comando",
  use: "(code)",
  category: 'creador',
  alias: ["e"],
  async run(client, message, args) {
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
    

    let tiempo1 = Date.now()
    
    if(!args[0]) return message.reply("Escriba algo a __evaluar__")
    if(args.join(" ").toLowerCase().includes("token")) return message.channel.send("NO TOQUES MI TOKEN P U T I T O")

    const edit = new Discord.MessageEmbed()
    .setDescription(":stopwatch: Evaluando...")
    .setColor("#7289DA")
    message.channel.send(edit).then(async msg => {
      try {
        let code = args.join(" ");
        let evalued = await eval(code);
        let tipo = typeof evalued||"Tipo no encontrado."
        if (typeof evalued !== 'string') evalued = require('util').inspect(evalued, { depth: 0, maxStringLength: 2000});
        let txt = "" + evalued;
    

    
        if (txt.length > 1048) {

          let link = await jsp.publicar(`- - - - Eval - - - -\n\n${txt.replace(client.token, "Wow, un token")}`)
            
          const embed = new Discord.MessageEmbed()
          .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
          .addField(":outbox_tray: Salida", `\`El codigo es muy largo, link:\` ${link.url}`)
          .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
          .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
          .setColor("#7289DA")
          msg.edit(embed);
                
        
        } else {
    

    
    
          const embed = new Discord.MessageEmbed()
          .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
          .addField(":outbox_tray: Salida", `\`\`\`js\n${txt.replace(client.token, "No quieres saber eso.")}\n\`\`\``)
          .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
          .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
          .setColor("#7289DA")
          msg.edit(embed);
        }
      } catch (err) {          
        let code = args.join(" ")
        const embed = new Discord.MessageEmbed()
        .setAuthor("Error en el eval", client.user.displayAvatarURL({dynamic : true}))
        .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: Salida", `\`\`\`js\n${err}\n\`\`\``)
        .addField(":file_folder: Tipo", `\`\`\`js\nError\n\`\`\``)
        .setColor("RED")
        msg.edit(embed);
      }
    })

  }
}