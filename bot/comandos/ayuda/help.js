module.exports = (client, message, args, Discord) => {
  let categoria = args[0];
  const escribe = message.channel.startTyping()
  const nescribe = message.channel.stopTyping(true)
  const tiempo = setTimeout

  const nodm = new Discord.MessageEmbed()
    .setTitle("Comandos de ayuda")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Aqui tienes todos los comandos de ayuda.")
    .setFooter("()=Obligatorio []=Opcional", client.user.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .addField("Comandos Beta del Creador", "`Vacio`")
    .addField("Comandos Beta", "`Vacio`")
    .addField("Comandos semi-beta", "`Vacio`")
    .addField("Comandos del creador", "`hpactualizacion (mensaje)` `hpinfoall [name/nombres/invite/id] (id del servidor)` `hpeval (avaluar)` `hpgpass` `hppremium [add/remove] (id servidor)` `hpblacklist (bl/wl) (id) [reason]`")
    .addField("Comandos personalizados", "`hpverify` `hpip` `hpmcpremium (jugadorpremium (si aparece un steve, es no premium))`")
    .addField(
      "Comandos de moderación",
      "`hpsetsuggestions` `hpprefix [prefix]` `hpdeletec` `hpwarn (usuario/get/clear/set) [razón]` `hpsetconfessions` `hpnuke` `hpblindchannel [time]` `hpunblindchannel`"
    )
    .addField(
      "Comandos de diversion",
      "`hpsuggest (sugerencia)` `hpppt (piedra-papel-tijeras)` `hpvotar (algo)` `hptyping` `hphola` `hprandom (numero)` `hpuser-info [@user]` `hpavatar [@user]` `hpsay (algo)` `hp8ball (pregunta)` `hppropuesta (mencion o id)` `hpsorteo (duracion en segundos) (sorteo)` `hpconfession (a/p) (confesion)` `hpemotes` `hpbuscaminas (numero de bombas) (tiempo) (minutos/segundos)` `hpnitro (cantidad)` `hpgetip (ip de minecraft)` `hplogo (gen/reget) (algo)` `hptts (texto a decir)`"
    )
    .addField(
      "Comandos de ayuda",
      "`hpgetid` `hpsupport [close]` `hpgetcid` `hpbugreport (reporte/bl/wl/reply) (id)` `hpping` `hphelp (categoria/categorias/alias)` `hpservidor` `hpinvite` `hpsv-info`"
    )
    .addField("Comandos de Economia", "`hpwork` `hpbal [jugador]` `hpdep (cantidad/all)` `hpwith (cantidad/all)` `hproulette (cantidad) (rojo/negro)` `hprob (jugador)` `hpgive-money (jugador) (cantidad) (cash/bank)` `hpset-money (jugador) (cantidad) (cash/bank)` `hpremove-money (jugador) (cantidad) (cash/bank)` `hpcrime` `hpbuymyguild (duracion)`")
    .addField("Comandos de Niveles", "`hpset-xp (usuario) (lvl/xp) (cantidad)` `hprank [usuario]`")
    .addField("Comandos de contraseñas", "`hppass canjear (pass)`")
  if (!categoria) {
    message.channel.startTyping()
    setTimeout(() => {
    message.author.send({ embed: nodm }).catch(() => {
      message.channel.send({ embed: nodm})
      return
    })
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
    message.channel.stopTyping(true)
    }, 7830)
  }else
  if(categoria === "nodm"){
    escribe
    setTimeout(() => {
      message.channel.send(nodm)
      nescribe
    }, 2859)
    
  }else
  if (categoria === "categorias") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Las categorias")
      .setDescription('Categorias')
      .addField(
        "Comandos Beta del Creador\nComandos Beta\nComandos semi-beta\nComandos del creador\nComandos personalizados\nComandos de moderación\nComandos de diversion\nComandos de ayuda\nComandos de contraseñas\nComandos de Economia\nComandos de Niveles",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cbdc") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos Beta del Creador")
      .setDescription('Comandos')
      .addField(
        "`Vacio`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cb") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos Beta")
      .setDescription('Comandos')
      .addField(
        "`Vacio`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "csb") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos semi-beta")
      .setDescription('Comandos')
      .addField(
        "`hpeconfig (mindinero) (maxdinero) [currency]`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cdc") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos del creador")
      .setDescription('Comandos')
      .addField(
        "`hpactualizacion (mensaje)` `hpinfoall` `hpgpass` `hpeval (avaluar)`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cp") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos personalizados")
      .setDescription('Comandos')
      .addField(
        "`hpverify` `hpsupport [close]` `hpip` `hpmcpremium (jugadorpremium (si aparece un steve, es no premium))`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cdm") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de moderacion")
      .setDescription('Comandos')
      .addField(
        "`hpsetsuggestions` `hpprefix (prefix/clear)` `hpdeletec` `hpwarn (usuario/get/clear/set) [razón]` `hpguildid`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cdd") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de diversion")
      .setDescription('Comandos')
      .addField(
        "`hprevivewkiss` `hpsuggest (sugerencia)` `hpkill (@alguien)` `hpslap (@alguien)` `hpppt (piedra-papel-tijeras)` `hpvotar (algo)` `hptyping` `hphola` `hprandom (numero)` `hpuser-info [@user]` `hpavatar [@user]` `hpsay (algo)` `hp8ball (pregunta)` `hppropuesta (mencion o id)` `hpsorteo (duracion en segundos) (sorteo)` `hpsetconfessions` `hpconfession (a/p) (confesion)` `hpemotes` `hpgetip (ip de minecraft)` `hplogo (gen/reget) (algo)` `hptts (texto a decir)`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cda") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de ayuda")
      .setDescription('Comandos')
      .addField(
        "`hpgetid` `hpgetcid` `hpbugreport (reporte/bl/wl/reply) (id)` `hpping` `hphelp` `hpservidor` `hpinvite` `hpsv-info`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "cdco") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de contraseñas")
      .setDescription('Comandos')
      .addField(
        "`hppass canjear (pass)`",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === "abreviaturas" || categoria === "alias") {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Las abreviaturas")
      .setDescription('En el mismo orden que como hphelp categorias')
      .addField(
        "cbdc\ncb\ncsb\ncdc\ncp\ncdm\ncdd\ncda\ncdco\ncde\ncdn",
        "** **"
      );
    escribe
    setTimeout(() => {
    message.author.send({ embed: embed2 });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
      nescribe
    }, 2859)
  }else
  if (categoria === 'cde'){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Comandos de Economia")
    .setDescription("Comandos")
    .addField("`hpwork`", "** **")
    .addField("`hpslut`", "** **")
    .addField("`hpcrime`", "** **")
    .addField("`hprob (jugador)`", "** **")
    .addField("`hpbal [jugador]`", "** **")
    .addField("`hpdep (cantidad/all)`", "** **")
    .addField("`hpwith (cantidad/all)`", "** **")
    .addField("`hproulette (cantidad) (rojo/negro)`", "** **")
    .addField("`hpgive-money (jugador) (cantidad) (cash/bank)`", "** **")
    .addField("`hpremove-money (jugador) (cantidad) (cash/bank)`", "** **")
    .addField("`hpset-money (jugador) (cantidad) (cash/bank)`", "** **")
    .addField("`hpbuymyguild (duracion)`", "** **")
    escribe
    setTimeout(() => {
      message.author.send({embed: embed})
      message.channel.send("**"+message.author.tag+"**, mira tus mensajes privados")
    }, 2864) 
    nescribe
  }else
  if (categoria === 'cdn'){
    const embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Comandos de Niveles")
    .setDescription("Comandos")
    .addField("`hpset-xp (usuario) (lvl/xp) (cantidad)`", "** **")
    .addField("`hprank [usuario]`", "** **")
    escribe
    setTimeout(() => {
      message.author.send({embed: embed2})
      message.channel.send("**"+message.author.tag+"**, mira tus mensajes privados")
    }, 2864)
    nescribe
  }else{

    message.channel.send("Esa categoria no existe, escriba 'hphelp categorias' y 'hphelp alias' para ver las categorias")
  }
};