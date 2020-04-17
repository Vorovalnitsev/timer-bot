var sendMessage = require('../services/telegram.js').sendMessage;

module.exports.help = function(incomingMessage){
    let tmpText = `Hello <b>${incomingMessage.message.from.first_name}.</b>\n` + 
        `I'm Timer-Bot.\n` + 
        `If you would like to set timer for any minutes please type <i>/start</i>\n` +
        `or type '<b>n min</b>'. Example '<b>2 min</b>'`;
    let outgoingMessage = {
        chat_id: incomingMessage.message.chat.id,
        text: tmpText,
        parse_mode: 'HTML'
    }
    sendMessage(outgoingMessage, function(err, res){
        if(err){
            console.log(err);
        }
        let tmpRes = JSON.parse(res.body);
        if(tmpRes.ok){
            console.log('ok')
        }
        else{
            console.log('not ok');
        }
    })
}