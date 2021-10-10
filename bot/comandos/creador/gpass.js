module.exports = {
  name: "gpass",
  description: "Genera una contraseña de 40 caracteres totalmente aleatorios",
  use: "",
  perms: {
    owner: process.env.OWNERS_ID
  },
  category: 'creador',
  alias: ["gen-pass"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const generatePassword = require("easy-password-gen");
  
  const pass1 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass2 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass3 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass4 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass5 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass6 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  const pass7 = generatePassword({
  lowercase: true,
  symbols: false,
  length: 40
    })
  message.author.send(pass1 +"\n"+ pass2 +"\n"+ pass3+"\n"+ pass4 +"\n"+ pass5+"\n"+ pass6 +"\n"+ pass7)
  }
}