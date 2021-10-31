module.exports = {
  name: "error",
  description: "Simula un error",
  perms: {
    owner: process.env.OWNERS_ID
  },
  category: "creador",
  alias: [],
  async run(client, message){
    message.reply({embeds:[message]})
  }
}