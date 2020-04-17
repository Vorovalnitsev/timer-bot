var request = require('request');
var config = require('../config.json');

//настраиваем запрос для отправки сообщения

var optionsSendMessage = {
    'method': 'POST',
    'url': `${config.telegram_api_server}bot${config.bot_tocken}/sendMessage`,
    'headers': {
    },
    formData: {}
  };

module.exports.sendMessage = function(message, callback){
  optionsSendMessage.formData = message;
  request(optionsSendMessage, function(err, res){
    if (err){
      callback(err,null);
    }
    else{
      callback(null, res)
    }
  })
}