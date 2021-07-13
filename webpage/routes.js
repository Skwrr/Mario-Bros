let { Router } = require('express')
let api = Router()
const app = require("express")() 
const fs = require("fs")
const Auth = require("./Middlewares/Auth")
app.get('/', Auth, (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/codes', (req, res) => {
  res.sendFile(__dirname + '/codes/list.html')
})

app.get('/codes/create', (req, res) => {
  res.sendFile(__dirname + '/codes/create.html')
})

app.get('/api/commands', Auth, (req, res) => {
  let cmds = [];
  fs.readdir('../bot/comandos').forEach(dir => {
    if(dir.endsWith('.js')){
		  cmds.push({
        name: dir.name,
        aliases: dir.alias,
        usage: dir.use,
        description: dir.description,
        category: dir.category
      });
    }else{
      const commands = fs.readdir(`../bot/comandos/${dir}`);
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
  res.send({ commands: cmds })
})
module.exports = app