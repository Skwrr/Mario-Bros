const api = require('express').Router()
let app = require("express")
app = app()
const fs = require("fs")
const { join } = require("path");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/codes', (req, res) => {
  res.sendFile(__dirname + '/codes/list.html')
})

app.get('/codes/create', (req, res) => {
  res.sendFile(__dirname + '/codes/create.html')
})

api.get('/api/comandos', (req, res) => {
  let cmddir = join(__dirname, "..", "bot", "comandos");
  let cmds = [];

  fs.readdirSync(require('../bot/comandos/')).forEach(dir => {
    if(dir.endsWith('.js')){
      cmds.push({
        name: dir.name,
        aliases: dir.alias,
        usage: dir.use,
        description: dir.description,
        category: dir.category
      });
    }else{
      const commands = fs.readdirSync(require(`../bot/comandos/${dir}`));
      for(let file of commands){
        if(file.endsWith('.js')){
          cmds.push({
            name: file.name,
            aliases: file.alias,
            usage: file.use,
            description: file.description,
            category: file.category
          });
        }
      }
    }
  })
  res.send({ comandos: cmds })
})

module.exports = () => {
  app.listen(3000, () => {
    console.log('Servidor Listo.');
  });
  return true;
}