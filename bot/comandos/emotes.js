module.exports = async(client, message, args, Discord) => {
  const emojiList = message.guild.emojis.map((e) => (e) + '   |   ' + e.name).join('\n\n');
  for(let i = 0; i < emojiList.length; i += 2000) {
  const splitList = emojiList.substring(i, Math.min(emojiList.length, i + 2000));
  const embed = new Discord.RichEmbed()
    .setTitle(`Emojis del server '${message.guild.name}': `)
    .setColor(0x003366)
    .setDescription(splitList);
    if(!em)
    message.channel.send({embed});
  }
  if(emojiList == 0){
    const anembed = new Discord.RichEmbed()
    .setTitle("No hay emotes en este servidor")
    .setColor("RED")
    message.channel.send(anembed)
  }
}