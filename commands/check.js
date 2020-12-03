const { prefix } = require('../config.json');
module.exports = {
	name: 'check',
	description: `${prefix}check [PlayerName] [CharacterStat]`,
	execute(message, args, characterDictionaries) {
        var playerName = args[0].toLowerCase();
        var characterStat = args[1].toLowerCase();
        characterStat = characterStat.charAt(0).toUpperCase() + characterStat.slice(1);
        //console.log(playerName+characterStat);
        message.channel.send(characterDictionaries[playerName]['CharacterName'] + '\'s ' + characterStat + 
            ' stat is: ' + characterDictionaries[playerName][characterStat]);
	},
};