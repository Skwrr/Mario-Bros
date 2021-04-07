const express = require('express')
const app = express();
const ejs = require("ejs")

app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/codes', (req, res) => {
  res.sendFile(__dirname + '/codes/list.html')
})

app.get('/codes/create', (req, res) => {
  res.sendFile(__dirname + '/codes/create.html')
})

app.get('/codes/search', (req, res) => {
  res.sendFile(__dirname + '/codes/buscar/search.php')
})

app.get('/php', (req, res) => {
  res.sendFile(__dirname + '/backend.html')
})

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css')
})

module.exports = () => {
  app.listen(3000, () => {
    console.log('Servidor Listo.');
  });
  return true;
}