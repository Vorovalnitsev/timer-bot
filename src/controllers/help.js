var sendMessage = require('../services/telegram.js').sendMessage;

module.exports.help = function(incomingMessage){
    let tmpText = `Hello <b>${incomingMessage.message.from.first_name}.</b>\n` + 
        `I'm Timer-Bot.\n` + 
        `To set up the timer for any time, type <i>/start</i>\n` +
        `or type '<b>n min</b>'. Example: '<b>2 min</b>'`;
    let outgoingMessage = {
        chat_id: incomingMessage.message.chat.id,
        text: tmpText,
        parse_mode: 'HTML'
    }
    sendMessage(outgoingMessage, function(err, res){
        if(err){
            console.log(err);
        }
    })
}