const { prefix } = require('../config.json');
module.exports = {
    name: 'roll',
    description: `${prefix}roll ([PlayerName]||[CharacterName] [CharacterStat]`,
    execute(message, args, characterDictionaries) {
      console.log(args[0]);
      if (isNumeric(args[0])){
        //come back here and make this better
        
        console.log("its a number");
        let num = parseInt(args[0], 10);

        var diceRoll = [];
        var total = 0;

        let d12 = rolldie(12);
        diceRoll.push('(' + d12 + ')');
        total += d12;
        for (let i = 0; i < num; i++) {
                let d6 = rolldie(6);
                total += d6;
                diceRoll.push('(' + d6 + ')');
            }

        message.channel.send(diceRoll + ' = ' + total);
        return;
      }

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
        total += d12;
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

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}