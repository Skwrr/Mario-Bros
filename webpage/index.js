let { Router } = require('express')
let api = Router()
let express = require("express")
let app = require("express")
app = app()
const fs = require("fs")
const { join } = require("path");


module.exports = () => {
  app.listen(3000, () => {
    console.log('Servidor Listo.');
  });
  return true;
}

const session = require("express-session");
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.Discord_ClientID,
      clientSecret: process.env.Discord_ClientSecret,
      callbackURL: "https://krypton.sergioesquina.repl.co" + "/login",
      scope: ["identify", "guilds"].join(" "),
    },
    function (accessToken, refreshToken, profile, done) {
      //User logged in yay!
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

app.use(
  session({
    secret: process.env.PASSWORD,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/login',
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(require("../routes"));