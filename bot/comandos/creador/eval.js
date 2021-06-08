module.exports = async(client, message, args, Discord) => {
  const staff = process.env.OWNERS_ID
  if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
/* Codigo de ejemplo hecho por tnfAngel */

/* Modulos requeridos
discord.js (npm i discord.js@latest)
jspaste (npm i jspaste@latest)
*/

  
/* ![IMPORTANTE] **En caso de no tener command handler tienes que poner lo siguiente**
* Hay que poner el codigo en un evento message y poner esto: *

const prefix = '!';
const args = message.content.slice(prefix.length).trim().split(/ +/g);
if (!message.content.startsWith(prefix+"eval")) return;
if (message.author.bot) return;
*/

// Aqui definimos los modulos que usaremos

const jsp = require('jspaste')

    // funciones que puedes llamar cuando evaluas (no son necesarias pero pueden ser utiles)
        async function enviar(mensaje) {
        return await message.channel.send(mensaje)
        }

        async function exec(codigo) {
        return await require("child_process").execSync(codigo)
        }
    // Puedes poner mas funciones, son solo ejemplos
    
    
    
    // Esta funcion es necesaria para que el tipo aparezca con la letra mayuscula para que discord le de color
    
    
        function mayuscula(string) {
            string = string.replace(/[^a-z]/gi, '')
            return string[0].toUpperCase()+string.slice(1)
        }
    
    // Este sera el tiempo que luego le restaremos a Date.now() para obtener los milisegundos que tardo en hacer el eval
        let tiempo1 = Date.now()
    
    if(!args[0]) return message.reply("Escriba algo a __evaluar__")
    if(args.join(" ").toLowerCase().includes("token")) return message.channel.send("NO TOQUES MI TOKEN P U T I T O")
    
    // Este mensaje saldra primero y se editara cuando termine de hacer el eval
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
    
    // Si el texto es mas grande que 1500 (ajustarlo a medida), el bot enviara un link con el codigo posteado en hastebin para que pueda ser del tamano que sea
    
              if (txt.length > 2048) {

                let link = await jsp.publicar(`- - - - Eval - - - -\n\n${txt.replace(client.token, "Wow, un token")}`)
            
                const embed = new Discord.MessageEmbed()
                .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
                .addField(":outbox_tray: Salida", `\`El codigo es muy largo, link:\` ${link.url}`)
                .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
                .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
                .setColor("#7289DA")
                msg.edit(embed);
                
        
              } else {
    
    // Si el texto es de una longitud normal hace el eval normal
    
    
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
    // ¡Eso fue todo :D un eval muy avanzado para hacer tus calculos de codigo en discord, agradeceria si le das like si realmente te sirvio!
}