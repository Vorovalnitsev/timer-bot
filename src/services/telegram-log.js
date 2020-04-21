const IncommingMessageModel = require('../models/telegram-log.js').IncommingMessageModel;

module.exports.newIncommingMessage = function (incommingMessage){
    let message = new IncommingMessageModel();
    if (incommingMessage.message){
        message.update_id = incommingMessage.update_id;
        message.message.message_id = incommingMessage.message.message_id;
        message.message.from = incommingMessage.message.from;
        message.message.chat = incommingMessage.message.chat;
        message.message.text = incommingMessage.message.text;
        message.message.date = incommingMessage.message.date;
        message.full_message = JSON.stringify(incommingMessage);
    
        message.save(function(err){
            if(err){
                console.log(err);
            }
        });
    }
}