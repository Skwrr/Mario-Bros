module.exports = {
  name: "createshortener",
  description: "Crea tu propio acortador",
  use: "(webpage) (shortener)",
  category: "util",
  premium: true,
  alias: ["cs", "makeshortener"],
  SlashCommand: {
    options: [
      {
        name: "webpage",
        description: "Pagina web a reducir",
        required: true,
        type: "STRING"
      },
      {
        name: "shortener",
        description: "https://Krypton.sergioesquina.repl.co/shorteners/shortener-name",
        required: true,
        type: "STRING"
      }
    ],
    async run(client, message, args){
      let fs = require("fs")
      let {link} = require("../functions")
      if(!link(args.getString("webpage"))) return message.reply({content: "Eso no es una url", ephemeral: true})
      if(args.getString("webpage").includes("https://") || args.getString("webpage").includes("http://")) return message.reply({content: "Debes escribir la url sin `https://` o `http://`", ephemeral:true})
      try{     
      fs.writeFileSync(`./webpage/shorteners/${args.getString("shortener")}.js`, `module.exports = {
          url: "${args.getString("webpage")}"
        }`)
        }catch(err) {
        message.reply({content: "Hubo un error, "+err.message, ephemeral: true})
      }
      message.reply("Acortador creado correctamente, ahora puedes acceder haciendo click [aqui](https://sepoxcraft48yt.sergioesquina.repl.co/shorteners/"+args.getString("shortener")+") después del reinicio para aplicar cambios (20s aprox)").then(() => {
        setTimeout(() => process.reload(message.channel), 200)
      })
    }
  }
}