const IncommingMessageModel = require('../models/telegram-log.js').IncommingMessageModel;

module.exports.saveIncommingMessage = function (incommingMessage){
    let message = new IncommingMessageModel();
    if (incommingMessage.message){
        message.message_id = incommingMessage.message.message_id;
        message.from = incommingMessage.message.from;
        message.chat = incommingMessage.message.chat;
        message.text = incommingMessage.message.text;
        message.date = incommingMessage.message.date;
        message.full_message = JSON.stringify(incommingMessage);
    
        message.save(function(err){
            if(err){
                console.log(err);
            }
        });
    }
    
}