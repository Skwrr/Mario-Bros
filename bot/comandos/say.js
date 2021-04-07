module.exports = (client, message, args) => {
  let texto = args.join(" ");
      if (!texto)
        return message.channel.send(`Escriba un contenido para decir.`);
      message.delete();
      message.channel.send(texto);
}