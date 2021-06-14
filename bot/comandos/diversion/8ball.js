module.exports = {
  name: "8ball",
  description: "Obten una respuesta mía sobre una pregunta tuya",
  use: "(question)",
  category: 'diversion',
  alias: [],
  async run(client, message, args) {
    const Discord = require("discord.js")
  let texto = args.slice(0).join(" ");

      var rpts = [
        "Sí",
        "No",
        "¿Por qué?",
        "Por favor",
        "Tal vez",
        "No sé",
        "Definitivamente?",
        "¡Claro!",
        "Sí",
        "No",
        "Por supuesto!",
        "Por supuesto que no",
        "Enserio?",
        ":v",
        "ESTOY MIMENTO LCDTM, DEJAME MIMIR"
      ];
      if (!texto)
        return message.channel.send(
          "Escriba una pregunta, `s/8ball (pregunta)`"
        );
      message.channel.send(
        message.member.user +
          "\nPregunta: \n`" +
          texto +
          "`\nRespuesta: \n`" +
          rpts[Math.floor(Math.random() * rpts.length)] +
          "`"
      );
  }
}