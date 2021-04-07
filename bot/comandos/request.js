module.exports = (client, message, args, Discord) => {
const sugerencia = args.join(" ")
    if (!sugerencia) return message.reply("Escribe el comando que desee enviar para añadir")
    const owner = "466241681654808576"
    client.users.get(owner).send(`${message.author.tag} ha solicitado añadir el comando: ${sugerencia}`);
    message.channel.send("**Ya se envio la solicitud para añadir el comando**")
}