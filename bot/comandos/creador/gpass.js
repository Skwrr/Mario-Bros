module.exports = {
  name: "gpass",
  description: "Genera una contraseña de 40 caracteres totalmente aleatorios",
  use: "",
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
  const staff = process.env.OWNERS_ID
  if (!staff.includes(message.author.id)) return message.channel.send("❌ **Solo mi Creador puede usar Este cmd** ❌")
  message.author.send(pass1 +"\n"+ pass2 +"\n"+ pass3+"\n"+ pass4 +"\n"+ pass5+"\n"+ pass6 +"\n"+ pass7)
  }
}