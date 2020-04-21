const sendMessage = require('../services/telegram.js').sendMessage;
const serviceTimerLog = require('../services/timer-log.js');
const async = require('async');
module.exports.setTimer = function(incomingMessage){
    
    let timePattern = /^\d{1,} min\s{0,}$/;
    let timeStr = incomingMessage.message.text.match(timePattern) ? incomingMessage.message.text.match(timePattern)[0] : null;    
    
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
                if(err){
                    console.log(err);
                }
            });
        }
        else{
            let outgoingMessage = {
                chat_id: incomingMessage.message.chat.id,
                text: `${incomingMessage.message.from.first_name}, Timer <b>${timeStr}</b> is started`,
                reply_markup: JSON.stringify({ remove_keyboard: true}),
                parse_mode: 'HTML'
            };
            
            sendMessage(outgoingMessage, function(err, res){
            });
            async.waterfall([
                function(callback){
                    serviceTimerLog.newTimer(incomingMessage.update_id, true, function(err, timer){
                        callback(null, timer);             
                    })
                },
                function(timer, callback){
                    setTimeout( () => {
                        callback(null, timer)
                    }
                    , 1000 * 60 * time);
                },
                function(timer, callback){
                    let outgoingMessage = {
                        chat_id: incomingMessage.message.chat.id,
                        text: `${incomingMessage.message.from.first_name}, Timer <b>${timeStr}</b> is finished`,
                        parse_mode: 'HTML'
                    };
                    sendMessage(outgoingMessage, function(err, res){
                        if(err){
                            console.log(err);
                        }
                        callback(null, timer);
                    })
                },
                function(timer, callback){
                    timer.timer_is_active = false;
                    serviceTimerLog.updateTimer(timer, function(err, timer){
                        callback(null);
                    })
                }
            ]) 
        }
    }
}