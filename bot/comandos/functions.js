module.exports = {
  getMemoryUsage: function() {
    const OS = require('os'); 
    const maxMemory = OS.totalmem(); 
    const free = OS.freemem(); 

    function memory(bytes = 0) {
      const gigaBytes = bytes / 1024 ** 3; 
      if(gigaBytes > 1) { 
        return `${gigaBytes.toFixed(1)} GB`; 
      }
      const megaBytes = bytes / 1024 ** 2;
      if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 
      if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 
      return `${Math.floor(megaBytes)} MB`; 
    }

    
    
    return {
        max: memory(maxMemory),
        free: memory(free),
        used: memory(maxMemory - free), 
        usedByProcess: memory(process.memoryUsage().rss) 
    }
  },
  name: "functions",
  async run(client, message, args){
    message.reply("En este archivo se guardan todas las funciones")
  }
}