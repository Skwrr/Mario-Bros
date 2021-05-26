module.exports = (client, message, args) => {
	const msg = message;
	let discordTTS = require('discord-tts'); // vamos a requerir del siguiente modulo, npm i discord-tts
	const db = require('megadb');
	let lang = new db.crearDB('lang');
  if(!lang.get(msg.guild.id)) lang.set(msg.guild.id, "es-ES")
    lang = lang.get(msg.guild.id)
		const decir = args.join(' '); // Una const para definir lor argumentos a decir / escribir
		const voiceChannel = msg.member.voice.channel;

		if (!voiceChannel)
			return msg.channel.send(
				'**:x: | Entra a un canal de voz y vuelve a intentarlo.**'
			); // Si la const voiceChannel es false retorna este mensaje

		if (!decir) return msg.channel.send('**:x: | ¿Que quieres que diga?**'); // Si la const decir es false retorna este mensaje

		voiceChannel.join().then(connection => {
			const broadcast = discordTTS.getVoiceStream(
				decir,
        "es-ES",
			); // Hacemos una const para conectar con discord-tts y dentro ponemos >decir>(los argumentos que se escucharan)
			const dispatcher = connection.play(broadcast);
		});
};
