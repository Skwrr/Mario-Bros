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
  mayuscula: function(string) {
    if(typeof(string) !== "string") throw new Error("No es una string")
    string = string.replace(/[^a-z]/gi, '')
    return string[0].toUpperCase()+string.slice(1)
  },
  link: function(link){
    let links = [
      "https://",
      ".gg",
      ".io",
      ".es",
      ".com",
      ".net",
      ".co",
      ".uk",
      "www.",
      ".me",
      "http://", 
      ".be"
    ]
    return links.some(li => link.includes(li))
  },
  findnext: function(tablero, pos, pos2){
    if(!tablero) throw new Error("Falta el tablero")
    if(!pos) throw new Error("Falta posición actual de la ficha")
    if(!pos2) throw new Error("Falta posición final de la ficha")
    if(tablero[parseInt(pos[0])-1][parseInt(pos[1])]) {
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])] === "⬜") return "⬛"
    }else
    if(tablero[parseInt(pos[0])+1][parseInt(pos[1])]) {
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])] === "⬜") return "⬛"
    }else
    if(tablero[parseInt(pos[0])][parseInt(pos[1])+1]) {
      if(tablero[parseInt(pos[0])][parseInt(pos[1])+1] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])][parseInt(pos[1])+1] === "⬜") return "⬛"
    }else
    if(tablero[parseInt(pos[0])][parseInt(pos[1])-1]) {
      if(tablero[parseInt(pos[0])][parseInt(pos[1])-1] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])][parseInt(pos[1])-1] === "⬜") return "⬛"
    }else
    if(tablero[parseInt(pos[0])-1][parseInt(pos[1])-1]) {
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])-1] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])-1] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])-1][parseInt(pos[1])+1]) {
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])+1] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])-1][parseInt(pos[1])+1] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])+1][parseInt(pos[1])+1]) {
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])+1] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])+1] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])+1][parseInt(pos[1])-1]) {
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])-1] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])+1][parseInt(pos[1])-1] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])+2][parseInt(pos[1])]) {
      if(tablero[parseInt(pos[0])+2][parseInt(pos[1])] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])+2][parseInt(pos[1])] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])-2][parseInt(pos[1])]) {
      if(tablero[parseInt(pos[0])-2][parseInt(pos[1])] === "⬛") return "⬛"
      if(tablero[parseInt(pos[0])-2][parseInt(pos[1])] === "⬜") return "⬜"
    }else
    if(tablero[parseInt(pos[0])][parseInt(pos[1])-2]) {
      if(tablero[parseInt(pos[0])][parseInt(pos[1])-2] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])][parseInt(pos[1])-2] === "⬜") return "⬛"
    }else
    if(tablero[parseInt(pos[0])][parseInt(pos[1])+2]) {
      if(tablero[parseInt(pos[0])][parseInt(pos[1])+2] === "⬛") return "⬜"
      if(tablero[parseInt(pos[0])][parseInt(pos[1])+2] === "⬜") return "⬛"
    }
  },
  valorationdb: async function(db){
    if(!db) throw new Error("Falta la propiedad DB")
    let valorationdb
    valorationdb = new db.crearDB("valoration")
    let media = Number(await valorationdb.get("total.valoration")) / Number(await valorationdb.get("total.times"))
    let medias
    if(media > 0 && media <= 0.5) return "Penoso"
    else if(media > 0.5 && media <= 1) return "Muy malo"
    else if(media > 1 && media <= 1.5) return "Malo"
    else if(media > 1.5 && media <= 2) return "Aceptable"
    else if(media > 2 && media <= 2.5) return "Bueno"
    else if(media > 2.5 && media <= 3) return "Muy bueno"
    else if(media > 3 && media <= 3.5) return "Buenisimo"
    else if(media > 3.5 && media <= 4) return "Excelente"
    else if(media > 4 && media <= 4.5) return "Lo mejor"
    else if(media > 4.5 && media <= 5) return "Perfecto"
    else return "Unknown Value"
  },
  betterInt: function (int){
    if(!int) throw new Error("Falta numero")
    if(int > 999999999) int = (int/1000000000).toFixed(2)+"B"
    if(int > 999999) int = (int/1000000).toFixed(2)+"M"
    if(int > 999) int = (int/1000).toFixed(2)+"k"

    return int
  },
  unicode: {
    a: '🇦', b: '🇧', c: '🇨', d: '🇩',
    e: '🇪', f: '🇫', g: '🇬', h: '🇭',
    i: '🇮', j: '🇯', k: '🇰', l: '🇱',
    m: '🇲', n: '🇳', o: '🇴', p: '🇵',
    q: '🇶', r: '🇷', s: '🇸', t: '🇹',
    u: '🇺', v: '🇻', w: '🇼', x: '🇽',
    y: '🇾', z: '🇿', 0: '0️⃣', 1: '1️⃣',
    2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',
    6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',
    10: '🔟', '#': '#️⃣', '*': '*️⃣',
    '!': '❗', '?': '❓',
  },
  name: "functions",
  async run(client, message, args){
    message.reply("En este archivo se guardan todas las funciones")
  }
}