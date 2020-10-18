module.exports = (client, message, args) => {
  const m = message;
  const msg = message.channel;
  const msga = message.author;

  if (!args[0]) {
    msg.send(
      "Error || Escribe `s/pass canjear`para canjearla"
    );
  }

  if (args[0] === "canjear") {
    const passes = [
      '9efsgmywa5x7czi14oxzpaoyozcodo3ap3te2wjp', //Rango Mod
      '4in8mta04zxtpz4zsff3m4pu3h7nnrlavaru0y3n', //Rango Sub
      '65o1n7owomg8j6q8yodxhmgaszm2nyn3097o1z39', //Rango personalizado
      '90rrofwnwbwzv3nuvj1gqukvpw08xnr837hq8pau', //Rango co-owner
      'matb9t6r5bzppc100dif89b6l2krlktczj978qyj', //Rango staff
      'cknh91cdnubyard09vnrfb68rqpv1ajqwe7trjs9', //Dinero infinito unbelieva
      'ff0ms4peks1aobvc2qvd9s4jip8bw57prudgxpzg' //Cosa que pida
    ]
    if (args[1]){
    if (passes.some(pass => message.content.toLowerCase().includes(pass))){
      m.delete()
      msg.send("Acceso concedido | Contacte con mi administrador para cambiar la pass y darle su premio");
    }
    if (!passes.some(pass => message.content.toLowerCase().includes(pass))){
      msg.send("Acceso denegado | Esa contraseña no es correcta");
    }
  
  }
    if (!args[1]){
      message.channel.send("Envie alguna pass")
    }
  }else if (args[0] !== "canjear"){
    message.reply("**Error || Escribe `s/pass canjear`para canjearla**")
  }
    
};
