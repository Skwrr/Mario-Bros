module.exports = (client) => {
     client.user.setPresence({
     status: "online",
     game: {
       name: "mi creador || s/help",
       url: "https://www.youtube.com/watch?v=FDBzKxZntKQ",
       type: "STREAMING"
     }
  });
  
}