const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.MessageContent,
	],
  });

const API_URL = 'https://api-inference.huggingface.co/models/biscuitbutb/biscuitbot-dialogpt-model/';

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
	try {
		if (message.author.bot) return;

		const payload = {
			inputs: {
				text: message.content
			}
		};
	
		const headers = {
			'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}`
		};
	
		message.channel.sendTyping();
	
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(payload)
		});
	
		const data = await response.json();

		message.reply(data);
	
	} catch (err) {
		message.reply('error occurred: ' + err.message)
	}
});
	

client.login(process.env.BOT_TOKEN);