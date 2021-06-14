module.exports = {
  name: "buscaminas",
  description: "Juega al clásico buscaminas",
  use: "(bomb number) (time) (minutes/seconds)",
  category: 'diversion',
  alias: ["bm"],
  async run(client, message, args) {
    const Discord = require("discord.js")
  const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  const bomb = 9; 
  let bombas = args[0];
  if(!args[0]) return message.reply("Escriba un numero de bombas")
  if(isNaN(bombas)) return message.reply("Escriba un numero, no "+bombas)
  if(bombas < 10){
    bombas = 10
  }
  if(bombas > 40){
    bombas = 40
  }
  
  let row = number[Math.floor(Math.random() * number.length)]; 
  let column = number[Math.floor(Math.random() * number.length)]; 
  
  var buscaminas=new Array(10); 

  for (let i = 0; i < 10; i++){
    buscaminas[i]=new Array(10); 
  }

  for (let i = 0; i<10; i++){
    for (let j = 0; j<10 ;j++){
      buscaminas[i][j] = 0;		
    }
  }
  while (bombas != 0) { 
    while(buscaminas[row][column]==9){ 
        row = number[Math.floor(Math.random() * number.length)]; 
        column = number[Math.floor(Math.random() * number.length)];
    }
    
      bombas = bombas-1;
      buscaminas[row][column] = 9;
      
    
    
     let iteri = 3;

		for (let i = 0; i < iteri; i++) {
			let iterj = 3; 
			if (row == 0 && i == 0)
				i++; 
			if (row == 10 - 1 && i == 0)
				iteri--; 
			for (let j = 0; j < iterj; j++) {
				if (column == 0 && j == 0)
					j++; 
				if (column == 10 - 1 && j == 0)
					iterj--;
				if (i != 1 || j != 1)
					if (buscaminas[row + i - 1][column - 1 + j] != bomb) 
						buscaminas[row + i - 1][column - 1 + j]++;
			}
		}
      
    }
  
   
  for (let i = 0; i<10; i++){
    for (let j = 0; j<10;j++){
        buscaminas[i][j] = choices[buscaminas[i][j]];
    }
  }
  let tiempo = args[1]
  if(!tiempo) return message.reply("Escriba un numero")
  if(isNaN(tiempo)) return message.reply("Escriba un numero, no \""+tiempo+"\"")
  let secmin = args[2]
  if(!secmin) return message.reply("Escriba \"segundos\" o \"minutos\"")
  let multiplicador;

  if(secmin.startsWith("segundos")){
    multiplicador = 1000
  }else if(secmin.startsWith("minutos")){
    multiplicador = 60000
  }else{
    message.reply("Escribe \"segundos\" o \"minutos\", no "+secmin)
    return;
  }

  let total = tiempo*multiplicador

  return message.channel.send(buscaminas).then(m => {
    setTimeout(() => {
      m.edit("Se acabo el tiempo!")
    }, total)
  })
}
}