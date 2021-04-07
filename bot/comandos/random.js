module.exports = (client, message, args) => {
  var numero = args.join(" ");
      var random = Math.round(Math.random() * numero);
      if (!numero)
        return message.channel.send("**Porfavor escriba un numero**");
      if (isNaN(numero))
        return message.channel.send("**Porfavor escriba un numero valido**");
      message.channel.send("El numero aleatorio es: " + random);
}