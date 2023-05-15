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

const API_URL = 'https://api-inference.huggingface.co/models/biscuitbutb/biscuitbot-dialogpt-model';


client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
	try {
		if (message.author.bot) return;

		const payload = {
			inputs: {
				text: message.content
			},
			options: {
				wait_for_model: true
			}
		};
	
		const headers = {
			'Authorization': `Bearer ${process.env.HUGGINGFACE_KEY}`
		};
	
		message.channel.sendTyping();
	
		const response = await fetch(API_URL, {
			method: 'post',
			body: JSON.stringify(payload),
			headers: headers
		});
		const data = await response.json();
		let botResponse = '';
		if (data.hasOwnProperty('generated_text')) {
			botResponse = data.generated_text;
		} else if (data.hasOwnProperty('error')) { 
			botResponse = data.error;
		}
		
		// message.channel.stopTyping();
		message.reply(botResponse);
	
	} catch (err) {
		message.reply('error occurred: ' + err.message)
	}
});
	

client.login(process.env.BOT_TOKEN);
