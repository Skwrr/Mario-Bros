module.exports = (client, message, args) => {
  if (message.guild.id === "720657677323075584") {
    message.channel.send("**La ip de HypnoCraft es: HypnoCraft.serv.gs**");
  } else {
    message.channel.send(
      "**Este comando es esclusivo para un servidor, si le gustaria tener su comando exclusivo contacte con mi creador (" +
        process.env.OWNER +
        ")**"
    );
  }
};
