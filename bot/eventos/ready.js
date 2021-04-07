module.exports = (client) => {
     client.user.setPresence({
     status: "online",
     game: {
       name: "mi creador || hphelp",
       url: "https://www.youtube.com/watch?v=FDBzKxZntKQ",
       type: "STREAMING"
     }
  });
  
}