module.exports = (client) => {
  client.user.setPresence({
        activity: {
            name: `mi creador || hphelp`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        },
        status: 'online'
    });
  
}