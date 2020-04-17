var sendMessage = require('../services/telegram.js').sendMessage

module.exports.setTimer = function(incomingMessage){
    
    let outgoingMessage = {
        chat_id: incomingMessage.message.chat.id,
        text: ""
    };
    
    let timePattern = /^\d{1,} min\s{0,}$/;
    let timeStr = incomingMessage.message.text.match(timePattern) ? incomingMessage.message.text.match(timePattern)[0] : null;    
    console.log(timeStr);
    if (timeStr){
        let time = timeStr.match(/\d{1,}/).join();

        /*
        The timeout must be in the range of 1-2,147,483,647 inclusive. If the value is
        outside that range, it's changed to 1 millisecond. Broadly speaking, a timer
        cannot span more than 24.8 days.
        */
        if (time > 35791){
            let outgoingMessage = {
                chat_id: incomingMessage.message.chat.id,
                text: `Timer cannot be more than 35791 minutes`,
                reply_markup: JSON.stringify({ remove_keyboard: true})
            };
            
            sendMessage(outgoingMessage, function(err, res){
            });
        }
        else{
            let outgoingMessage = {
                chat_id: incomingMessage.message.chat.id,
                text: `Timer ${timeStr} is working...`,
                reply_markup: JSON.stringify({ remove_keyboard: true})
            };
            
            sendMessage(outgoingMessage, function(err, res){
            });

            console.log(time);
            setTimeout( () => {
                let outgoingMessage = {
                    chat_id: incomingMessage.message.chat.id,
                    text: `Timer ${timeStr} is done`
                };
                sendMessage(outgoingMessage, function(err, res){
                    if(err){
                        console.log(err);
                    }
                    let tmpRes = JSON.parse(res.body);
                    if(tmpRes.ok){
                        console.log('ok')
                    }
                    else{
                        console.log(tmpRes.body)
                        console.log('not ok');
                    }
                })
            }, 1000 * 60 * time);
        }
    }
}