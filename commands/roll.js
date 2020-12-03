const { prefix } = require('../config.json');
module.exports = {
    name: 'roll',
    description: `${prefix}roll ([PlayerName]||[CharacterName] [CharacterStat]`,
    execute(message, args, characterDictionaries) {
        var playerName = args[0].toLowerCase();
        var characterStat = args[1].toLowerCase();
        var diceRoll = [];
        var total = 0;
        characterStat = characterStat.charAt(0).toUpperCase() + characterStat.slice(1);

        if (!(playerName in characterDictionaries)){

            for (var i in characterDictionaries) {

                if (characterDictionaries[i]['CharacterName'].toLowerCase() === playerName){
                    playerName = characterDictionaries[i]['Player'].toLowerCase();
                    //console.log('playername:' + playerName);
                    break;
                }
            }
        }

        let d12 = rolldie(12);
        diceRoll.push('(' + d12 + ')');
        total += d12
        if (characterDictionaries[playerName][characterStat] != 0){
            //diceRoll.push('+');
            
            for (let i = 0; i < characterDictionaries[playerName][characterStat]; i++) {
                let d6 = rolldie(6);
                total += d6;
                diceRoll.push('(' + d6 + ')');
            }
        }
       

        message.channel.send(characterDictionaries[playerName]['FullCharacterName'] + '\'s ' + characterStat + 
            '[' + characterDictionaries[playerName][characterStat] + ']' + ' roll is: ' + diceRoll + ' = ' + total);

        if (d12 === 12)
        {
            message.channel.send('Good roll master ' + characterDictionaries[playerName]['CharacterName'] + '!');
        }
        else if (d12 === 11)
        {
            message.channel.send('I cant watch 🙈');
        }
    },
};


function rolldie(die) {
    return Math.floor(
        Math.random() * (die) + 1
    )
}