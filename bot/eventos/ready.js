module.exports = (client) => {
  client.user.setPresence({
        activity: {
            name: `mi creador || mb.help`,
            type: 'STREAMING',
            url: "https://www.youtube.com/watch?v=FDBzKxZntKQ"
        },
        status: 'online'
    });
  
}