module.exports = (client, message, args, Discord) => {
  let categoria = args[0];
  const escribe = message.channel.startTyping()
  const nescribe = message.channel.stopTyping(true)
  const tiempo = setTimeout

  const nodm = new Discord.RichEmbed()
    .setTitle("Comandos de ayuda")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("RANDOM")
    .setDescription("Aqui tienes todos los comandos de ayuda.")
    .setFooter("()=Obligatorio []=Opcional", client.user.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .addField("Comandos Beta del Creador", "`Vacio`")
    .addField("Comandos Beta", "`Vacio`")
    .addField("Comandos semi-beta", "`Vacio`")
    .addField("Comandos del creador", "`hpactualizacion (mensaje)` `hpinfoall [namehpnombres]` `hpgpass`")
    .addField("Comandos personalizados", "`hpverify` `hpsupport [close]` `hpstatus (estado) [modalidades]` `hpip`")
    .addField(
      "Comandos de moderación",
      "`hpsetsuggestions` `hpclear (numero de mensajes)` `hpeval (avaluar)` `hpprefix [prefix]` `hpdeletec` `hpwarn (usuario/get/clear/set) [razón]`"
    )
    .addField(
      "Comandos de diversion",
      "`hprevivewkiss` `hpsuggest (sugerencia)` `hpkill (@alguien)` `hpmeme` `hpslap (@alguien)` `hpppt (piedra-papel-tijeras)` `hpvotar (algo)` `hptyping` `hpget-account` `hpadd-account (email:pass)` `hphola` `hprandom (numero)` `hpuser-info [@user]` `hpavatar [@user]` `hpsay (algo)` `hp8ball (pregunta)` `hppropuesta (mencion o id)` `hpsorteo (duracion en segundos) (sorteo)` `hpsetconfessions` `hpconfession (a/p) (confesion)` `hpemotes`"
    )
    .addField(
      "Comandos de ayuda",
      "`hpgetid` `hpgetcid` `hpbugreport (reporte/bl/wl/reply) (id)` `hpping` `hphelp` `hpservidor` `hpinvite` `hpsv-info`"
    )
  .addField("Comandos de contraseñas", "`hppass canjear (pass)`")
  if (!categoria) {
    message.channel.startTyping()
    setTimeout(() => {
    message.author.send({ embed: nodm });
    message.channel.send(
      "**" + message.author.username + "**, Revisa tus mensajes privados."
    );
    message.channel.stopTyping(true)
    }, 7830)
  }
  if(categoria === "nodm"){
    escribe
    setTimeout(() => {
    message.channel.send(
      message.channel.send(nodm)
    );
      nescribe
    }, 2859)
    
  }
  if (categoria === "categorias") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Las categorias")
      .setDescription('Categorias')
      .addField(
        "Comandos Beta del Creador\nComandos Beta\nComandos semi-beta\nComandos del creador\nComandos personalizados\nComandos de moderación\nComandos de diversion\nComandos de ayuda\nComandos de contraseñas\nComandos de Economia",
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
  }
  if (categoria === "cbdc") {
    const embed2 = new Discord.RichEmbed()
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
  }
  if (categoria === "cb") {
    const embed2 = new Discord.RichEmbed()
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
  }
  if (categoria === "csb") {
    const embed2 = new Discord.RichEmbed()
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
  }
  if (categoria === "cdc") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos del creador")
      .setDescription('Comandos')
      .addField(
        "`hpactualizacion (mensaje)` `hpinfoall` `hpgpass`",
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
  }
  if (categoria === "cp") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos personalizados")
      .setDescription('Comandos')
      .addField(
        "`hpverify` `hpsupport [close]` `hpstatus (estado) [modalidades]` `hpip` `hpmcpremium (jugadorpremium (si aparece un steve, es no premium))`",
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
  }
  if (categoria === "cdm") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de moderacion")
      .setDescription('Comandos')
      .addField(
        "`hpsetsuggestions` `hpclear (numero de mensajes)` `hpeval (avaluar)` `hpprefix [prefix]` `hpdeletec` `hpwarn (usuario/get/clear/set) [razón]` `hpguildid`",
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
  }
  if (categoria === "cdd") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Comandos de diversion")
      .setDescription('Comandos')
      .addField(
        "`hprevivewkiss` `hpsuggest (sugerencia)` `hpkill (@alguien)` `hpmeme` `hpslap (@alguien)` `hpppt (piedra-papel-tijeras)` `hpvotar (algo)` `hptyping` `hpget-account` `hpadd-account (email:pass)` `hphola` `hprandom (numero)` `hpuser-info [@user]` `hpavatar [@user]` `hpsay (algo)` `hp8ball (pregunta)` `hppropuesta (mencion o id)` `hpsorteo (duracion en segundos) (sorteo)` `hpsetconfessions` `hpconfession (a/p) (confesion)` `hpemotes`",
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
  }
  if (categoria === "cda") {
    const embed2 = new Discord.RichEmbed()
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
  }
  if (categoria === "cdco") {
    const embed2 = new Discord.RichEmbed()
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
  }
  if (categoria === "abreviaturas") {
    const embed2 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Las abreviaturas")
      .setDescription('En el mismo orden que como hphelp categorias')
      .addField(
        "cbdc\ncb\ncsb\ncdc\ncp\ncdm\ncdd\ncda\ncdco\ncde",
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
  }
};