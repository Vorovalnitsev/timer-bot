var sendMessage = require('../services/telegram.js').sendMessage;

module.exports.start = function(incomingMessage){
    let keyBoardButtons = [
        [{ text: "1 min" }, { text: "2 min" }, { text: "3 min" } ],
        [{ text: "5 min" }, { text: "10 min" }, { text: "15 min" } ]
    ];

    let keyBoardMarkup = {
        keyboard: keyBoardButtons,
        resize_keyboard: true,
        one_time_keyboard: false
    };
    let outgoingMessage = {
        chat_id: incomingMessage.message.chat.id,
        text: "Please, select time ...",
        reply_markup: JSON.stringify(keyBoardMarkup)
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
}