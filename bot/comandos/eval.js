module.exports = (client, message, args, Discord) => {
  if(message.author.id !== "466241681654808576") {
            let embed = new Discord.MessageEmbed() //Creamos el embed
            .setDescription("Mmm, no tienes los permisos suficientes para hacer esto")
        message.channel.send(embed)
        return true
        }

        
        let toEval = args.join(" ") //Definimos toEval con argumentos
        if(!toEval) { //Creamos un if para que diga
            let embed = new Discord.MessageEmbed()
            .setDescription("Necesitas evaluar __*ALGO*__")
            .setColor("RANDOM")
            message.channel.send(embed)
            .then(m => m.delete(2000))
          return
        } 
        try { //Hacemos un try
         if(args.join(" ").toLowerCase().includes("token")){
           return message.channel.send("NO TOQUES MI TOKEN P U T I T O")
         }
         
         let evaluated = eval(toEval) //"evaluated" va a evaluar el comando
       
        let beautify = require("beautify") //Se usa beautify para que funcione
        let embed = new Discord.MessageEmbed() //Creamos otro embed
        .setColor("RANDOM")
        .setTimestamp() //Usamos un Timestamp
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTitle(`:desktop: ${client.user.username}`)
        .setDescription("Este comando sirve para ejecutar codigos")
        .addField("Codigo:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Lo evaluado:", "```js\n"+evaluated+"```") //Aca aparecera lo que se evalua
        message.channel.send(embed)
    } catch(err) { //Hacemos un catch y que defina err
        let beautify = require("beautify")
       let embed2 = new Discord.MessageEmbed()
       .setTimestamp()
       .setFooter(client.user.username, client.user.displayAvatarURL())
       .addField("Hubo un error con el codigo que evaluaste", "```js\n"+err+"\n```") //Va a aparecer el error
       .setColor("RANDOM")
       message.channel.send(embed2) 
    }
}