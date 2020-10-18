module.exports = async(client, message, args) => {
  message.delete()
  var modalidades;
  if(args[1]){
    modalidades = args.slice(1).join('\n')
  }else{
    modalidades = 'Todas'
  }
  message.channel.fetchMessage('725442122152673282').then(m => {
    var estado;
    if(args[0]) {
      estado = args[0]
    } else {
      estado = '**Cerrado**'
    }
    m.edit('▬▬▬▬ Hypno Craft ▬▬▬▬ \n             Estado del servidor:\n                 **'+estado+'**\n▬▬▬▬ Modalidades ▬▬▬▬\n                 **'+modalidades+'\n**PING: @everyone / @here \n▬▬▬▬ Hypno Craft ▬▬▬▬')
  })
}