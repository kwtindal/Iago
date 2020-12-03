module.exports = {
	name: 'hello',
	description: 'Hello sir!',
	execute(message, args, characterDictionaries) {
		message.channel.send('Hello sir!');
	},
};