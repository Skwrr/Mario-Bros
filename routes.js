let express = require('express')
const app = express()
let { MessageActionRow: mar, MessageButton: mb } = require("discord.js")
const url = require("url")
const fs = require("fs")
const Auth = require("./webpage/Middlewares/Auth")
let client = require("./bot/eventos/ready.js")
let {Permissions} = require("discord.js")
let db = require("megadb")

function sendFile(res, path = "/webpage/premium.html"){
  return res.sendFile(__dirname+path)
}

function redirect(res, url = "/dashboard"){
  return res.redirect(url)
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/webpage/index.html')
});

app.get('/getpremium/:id', async(req, res) => {
  let guildid = url.parse(req.url, true).query.guildid
  let id = req.params.id

  db = require("megadb")
  let idq = new db.crearDB("premiumav")

  if(idq.has(`${id}`) && await idq.get(`${id}`) == "true" && client.client?.guilds.resolve(guildid) != undefined && client.client?.guilds.resolve(guildid) != null){
    let premiumdb = require("megadb")
    premiumdb = new premiumdb.crearDB("premium")
    idq.set(`${id}`, "false")
    premiumdb.set(`${guildid}`, "false")
    return res.send("Se ha añadido premium a la guild "+client.client?.guilds.resolve(guildid).name+", si aparece `undefined` es porque pusiste una letra o una guild no válida y acabas de perder tu premium gratis por wbn >:)")
  }

  if(idq.has(`${id}`) && await idq.get(`${id}`) == "true") {
    sendFile(res)
  } else {
    res.send(`Si quieres premium gratis, generalo`)
  }

})

app.get('/logout', (req, res) => {
  if(req.user) {
    req.logout()
    res.redirect("/")
  }else res.send("Dude, you arent logged in...")
})

app.get('/dashboard', Auth, (req, res) => {
  res.sendFile(__dirname + '/webpage/dashboard.html')
});

app.get("/servers", Auth, (req, res) => {
  res.sendFile(__dirname+"/webpage/servers.html");
});

app.get("/servers/:id", Auth, (req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id))
    return res.redirect("/servers");
  res.sendFile(__dirname+"/webpage/server.html");


  var newPrefix = url.parse(req.url, true).query
  newPrefix = newPrefix.newPrefix



  let db = require("megadb")
  if(!newPrefix) return
  else {
    new db.crearDB("prefixes").set(req.params.id, newPrefix)
  
    // alert("Prefix del servidor "+client.client.guilds.resolve(req.params.id).name+" cambiado a "+newPrefix)
  }
});

app.get("/servers/:id/customcommands", Auth, async(req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id)) return res.redirect("/servers");

  res.sendFile(__dirname+"/webpage/commands.html");
});

app.get('/free-hosting', (req, res) => {

  var query = url.parse(req.url, true).query
  let hosturl = query.hosturl,
  user = query.userId,
  hostName = query.hostname

  if(!hosturl) return res.sendFile(__dirname + '/webpage/host.html')

  function checkErrors(){
    let {link: isLink} = require("./bot/comandos/functions.js")
    if(!hostName) return "Falta el nombre de la URL"
    if(!hosturl) return "Falta la url"
    if(!parseInt(user)) return "Falta la id del usuario"
    if(!isLink(hosturl) || hosturl.includes("google") || !hosturl.includes("https://") && !hosturl.includes("http://")) return "No es una URL Válida"
    return "pass"
  }
  if(checkErrors() !== "pass") res.redirect("/free-hosting/failure?hosturl="+hosturl+"&error="+checkErrors())
  else res.redirect("/free-hosting"+`/success?hosturl=${hosturl}&hostname=${hostName}&user=${user}`)
})

app.get('/free-hosting/failure', (req, res) => {
  res.send("Has tenido un fallo, acá tienes tu URL: "+url.parse(req.url, true).query.hosturl+". Y acá el error: `"+url.parse(req.url, true).query.error+"`")
})

app.get('/free-hosting/success', (req, res) => {
  let query = url.parse(req.url, true).query
  let hosturl = query.hosturl,
  user = query.userId,
  hostName = query.hostname

  let db = require("megadb")
  db = new db.crearDB("hosts")
  let ae
  db.map(false, e => ae=e)
  if(ae.includes(hosturl.toLowerCase())) return res.redirect(`/free-hosting/failure?hosturl=${hosturl}&error=Url%20ya%20en%20uso`)
  db.push("hosts", hosturl.toLowerCase())

  res.send("El Host acaba de ser aprobado, espere unos momentos mientras se reinicia el bot")
  process.reload()
})

app.get("/servers/:id/customcommands/create", Auth, async(req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id)) return res.redirect("/servers");

  var query = url.parse(req.url, true).query
  let code = query.code,
  user = query.userId,
  commandName = query.cmdname

  if(!commandName) return res.sendFile(__dirname+"/webpage/createcustom.html");

  function checkErrors(){
    if(!commandName) return "Falta el nombre del comando"
    if(!code) return "Falta el codigo"
    if(!parseInt(user)) return "Falta la id"
    return "pass"
  }
  if(checkErrors() !== "pass") res.redirect("/servers/"+req.params.id+"/customcommands/failure?code="+code+"&error="+checkErrors())
  else res.redirect("/servers/"+req.params.id+`/customcommands/success?code=${code}&cmdname=${commandName}&user=${user}`)
});

app.get("/servers/:id/customcommands/failure", Auth, async(req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id)) return res.redirect("/servers");

  let info = url.parse(req.url, true).query,
  code = info.code,
  error = info.error

  res.send(error+", acá tienes tu code por si quieres copiarlo: "+code);
});

app.get("/servers/:id/customcommands/success", Auth, async(req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id)) return res.redirect("/servers");

  let info = url.parse(req.url, true).query,
  code = info.code,
  userId = info.user,
  commandName = info.cmdname

  function createCommand(client, code, userId){
let user = userId
    if(!client) return "No se obtuvo Client"
    if(!code) return "No se obtuvo el codigo"
    if(!parseInt(userId)) return "Id Invalida"
    let row = new mar().addComponents([new mb().setStyle("SUCCESS").setLabel("Aceptar").setCustomId("accept_code"), new mb().setStyle("DANGER").setLabel("Rechazar").setCustomId("reject_code")])
    if(!client.comandos.has(commandName)) {
      client.users.resolve("466241681654808576").send({content: "Comando `"+commandName+"` de "+client.users.resolve(user).username+"!\n```js\n"+code+"\n```", components: [row]}).then(async m => {
        let filter = (btn) => btn.user.id === "466241681654808576"
        let collector = m.createMessageComponentCollector({filter, componentType: "BUTTON", max: 1})
        collector.on("collect", collected => {
          if(collected.customId == "accept_code"){
            collected.reply({content: "Comando Aceptado", ephemeral: true})
            client.users.resolve(user).send("Tu codigo ha sido aceptado! Ahora puedes usarlo en tu servidor")
            fs.writeFileSync("./bot/comandos/personalizados/"+commandName+".js", `module.exports = {
  name: "${commandName}",
  description: "An command made by a premium user",
  use: "[delete]",
  category: "personalizados",
  premium: true,
  alias: [],
  Custom: "${req.params.id}",
  async run(client, message, args){
    if(message.guild.id !== "${req.params.id}") return message.reply("Este comando solo está disponible para mi servidor de soporte, si quieres añadir tu propio comando totalmente customizado, adquiere \`premium\` en tu servidor y accede al panel del bot")
    if(args[0] === "delete") {
      message.reply("Comando eliminado")
      client.comandos.delete("${commandName}")
      return require("fs").unlinkSync(__dirname+"/${commandName}.js")
    }
    ${code}
  }
}`)   
            client.comandos.set(commandName, require("./bot/comandos/personalizados/"+commandName+".js"))
          }else if(collected.customId == "reject_code"){
            collected.reply({content: "Comando Rechazado", ephemeral: true})
            client.users.resolve(user).send("Por desgracia, tu comando no ha sido aprovado, prueba tu comando, puede que haya errores")
          }
        })
      })
    }else{
      return "Ese comando ya existe"
    }
    return "pass"
  }

  if(createCommand(client.client, code, userId) !== "pass") return res.redirect("failure?code="+code+" &error="+createCommand(client.client,code, userId) )

  res.send("Tu codigo ahora está en la lista de espera, recibirás un MD cuando te acepten el codigo");
});

app.get('/api/info/:id', async(req, res) => {
  let db = require("megadb")
  let prefix = new db.crearDB("prefixes")
  let guildid = req.params.id
  if(!client.client?.guilds.resolve(req.params.id)) return res.send("Non valid guild")
  prefix = prefix.has(req.params.id) ? await prefix.get(req.params.id) : "k!"
  res.send({
    // poto: client.client.commandsran
    commands: client.client?.commandsran,
    users: client.client?.userssize,
    guilds: client.client?.guildssize,
    valoration: client.client?.valorations,
    ClientID: client.client?.user.id,
    Permissions: 8,
    Scopes: ["identify", "guilds"],
    Website: "https://Krypton.sergioesquina.repl.co",
    CallbackURL: "/login",
    prefix: prefix,
    queue: client.client?.distube.queues.collection.has(guildid) ? client.client?.distube.queues.collection.get(guildid).songs.length : 0,
    songsLoop: client.client?.distube.queues.collection.get(guildid)?.repeatMode === 1 ? "Enabled" : "Disabled",
    queueLoop: client.client?.distube.queues.collection.get(guildid)?.repeatMode === 2 ? "Enabled" : "Disabled",
  })
})

app.get('/api/info/', async(req, res) => {
  let baltop = new db.crearDB("economy")
  let arr = [], arr2 = []
  let sort = await baltop.sort(false, "bank");
  sort.map(datos => arr.push({id: datos.clave, total: Number(datos.valor.cash)+Number(datos.valor.bank)}))
  let map;
  sort = await arr.sort(function(a,b) {
    return b.total-a.total
  })
  map = await sort.map(async function (datos) {
    arr2.push(
      { 
        user: client.client?.usuarios.resolve(datos.id) ? client.client?.usuarios.resolve(datos.id).tag : datos.id,
        bal: datos.total
      }
    )
  })
  res.send({
    commands: client.client?.commandsran,
    users: client.client?.userssize,
    guilds: client.client?.guildssize,
    valoration: client.client?.valorations,
    ClientID: client.client?.user.id,
    Permissions: 8,
    Scopes: ["identify", "guilds"],
    Website: "https://Krypton.sergioesquina.repl.co",
    CallbackURL: "/login",
    baltop: await arr2.slice(0,5),
  })
})

app.get("/api/user", Auth, async (req, res) => {
  if (!req.user) return res.send({});
  req.user.guilds.map(async(g) => {
    g.hasPerms = new Permissions(g.permissions_new).has(Permissions.FLAGS.MANAGE_GUILD, true)
    g.inGuild = client.client?.guilds.cache.has(g.id);
    return g;
  });
  res.send({ user: req.user });
})

app.get('/api/commands', (req, res) => {
  let cmds = [];
  fs.readdirSync('./bot/comandos/').forEach(dir => {
    if(dir.endsWith('.js')){
      let dirr = require("./bot/comandos/"+dir)
		  cmds.push({
        name: dirr.name,
        aliases: dirr.alias,
        usage: dirr.use,
        description: dirr.description,
        category: dirr.category,
        premium: dirr.premium,
        SlashCommand: dirr.SlashCommand ? true : false,
        Custom: dirr.Custom ? dirr.Custom : null
      });
    } else {
      fs.readdirSync(__dirname+`/bot/comandos/${dir}`).forEach(file => {
        if(file.endsWith('.js')){
          let filee = require(__dirname+`/bot/comandos/${dir}/${file}`)
		      cmds.push({
            name: filee.name,
            aliases: filee.alias,
            usage: filee.use,
            description: filee.description,
            category: filee.category,
            premium: filee.premium,
            SlashCommand: filee.SlashCommand ? true : false,
            Custom: filee.Custom ? filee.Custom : null
          });
        }
      })
    }
  });
  res.send({ commands: cmds })
})

app.get("/api/bots", async(req, res) => {
  let db = require("megadb")
  db = new db.crearDB("request")
  bots = await db.map(false, e => e)

  res.send({ bots: [bots[1]] })
})

fs.readdirSync(__dirname+"/webpage/shorteners").forEach(file => {
  if (file.endsWith('.js')) {
		let fileName = file.substring(0, file.length - 3);
    let link = require("./webpage/shorteners/"+fileName+".js").url
    app.get('/shorteners/'+fileName, (req, res) => {
      res.redirect(`https://${link}`)
    });
  }
})

app.get('/shorteners', (req, res) => {
  let shorteners = []
  let i = 0
  fs.readdirSync(__dirname+"/webpage/shorteners").forEach(file => {
    if (file.endsWith('.js')) {
      i++
      let fileName = file.substring(0, file.length - 3);
      let link = require("./webpage/shorteners/"+fileName+".js").url
      shorteners.push(i, {name: fileName, link: link})
    }
  })
  res.send({ chosen: shorteners })
});

app.get("/bot/eventos/ready.js", (req, res) => {
  res.send({ db: require("megadb") })
})

app.get("/botlist", (req, res) => {
  res.sendFile(__dirname+"/webpage/botlist/dashboard.html")
})

app.get("/botlist/bot", (req, res) => {
  res.redirect("/botlist")
})

app.get("/botlist/bot/:id", (req, res) => {
  res.sendFile(__dirname+"/webpage/botlist/bot.html")
})
module.exports = app