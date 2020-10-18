module.exports = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("No tienes permisos para usar ese comando")
  if (message.member.hasPermission("MANAGE_CHANNELS")){
  var nmensajes = args.join(" ");
      message.delete();
      if (isNaN(nmensajes))
        return message.channel.send(
          "**Porfavor escriba un numero; no una letra**"
        );
      if (nmensajes > 100)
        return message.channel.send(
          "**Porfavor escriba un numero menor que 100**"
        );
      if (nmensajes <= 0)
        return message.channel.send(
          "**Porfavor escriba un numero mayor que 1**"
        );
      setTimeout(() => {
        message.channel.bulkDelete(nmensajes)
          message.channel
          .send("**" + nmensajes + " mensajes eliminados**")
          .then(m => {
            m.delete(5000);
          
      }, 2000);
        })
  }else if (message.author.id === '466241681654808576'){
    var nmensajes = args.join(" ");
      message.delete();
      if (isNaN(nmensajes))
        return message.channel.send(
          "**Porfavor escriba un numero; no una letra**"
        );
      if (nmensajes > 100)
        return message.channel.send(
          "**Porfavor escriba un numero menor que 100**"
        );
      if (nmensajes <= 0)
        return message.channel.send(
          "**Porfavor escriba un numero mayor que 1**"
        );
      setTimeout(() => {
        message.channel.bulkDelete(nmensajes).catch(() => {
          message.channel.send("No se pudieron eliminar mensajes, pruebe con un numero mas pejeño que" + nmensajes)
          return
        })
          message.channel.send("**" + nmensajes + " mensajes eliminados**").then(m => {
            m.delete(5000);
          
      });
        }, 2000)
        
  }
        
}