module.exports = async(client, command) => {
  let fs = require("fs")
  if(command.isCommand()){
    let args = command.options
    let db = require("megadb")
    let cmd;
    fs.readdirSync('./bot/comandos/').forEach(dir => {
      if (dir.endsWith('.js')) {
        let fileName = dir.substring(0, dir.length - 3);
        if(command.commandName === fileName) {
          cmd = require(`../comandos/${dir}`)
          if(cmd.premium && cmd.premium === true){
            const gp = new db.crearDB("premium")
            let premium = gp.has(command.guild.id)
            if(!premium) return command.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Musica\`")
          }
          cmd.SlashCommand.run(client, command, args)
        }
      } else {
        const commands = fs.readdirSync(`./bot/comandos/${dir}`);
        for (let file of commands) {
          if (file.endsWith('.js')) {
            let fileName = file.substring(0, file.length - 3);
            if(command.commandName === fileName) {
              cmd = require(`../comandos/${dir}/${file}`)
              if(cmd.premium && cmd.premium === true){
                const gp = new db.crearDB("premium")
                let premium = gp.has(command.guild.id)
                if(!premium) return command.reply("Tu servidor no tiene mi caracteristica \`Premium\`, por lo que no puedes usar mis comandos de \`Musica\`")
              }
              cmd.SlashCommand.run(client, command, args)
            }
          }
        }
      }
    });
  }
}