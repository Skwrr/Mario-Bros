const { Permissions } = require("discord.js");
const client = require("../../bot/eventos/ready.js");
const api = require("express")()

api.get("/", async (req, res) => {
  if (!req.user) return res.send({});
  req.user.guilds.map((g) => {
    g.hasPerms = new Permissions(g.permissions).has("MANAGE_GUILD", true);
    g.inGuild = client.client.guilds.cache.has(g.id);
    return g;
  });
  res.send({ user: req.user });
});
