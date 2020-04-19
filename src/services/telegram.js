const request = require('request');
const config = require('../config.json');
const fs = require('fs');

//настраиваем запрос для установки вебхука
const optionsToSetWebhook = {
  'method': 'GET',
  'url': `${config.telegram_api_server}bot${config.bot_tocken}/setWebhook`,
  'headers': {
  },
  formData: {
    'url': `${config.https_server.url}${config.bot_tocken}`,
    'certificate': {
      'value': fs.readFileSync(config.https_server.certificates.public),
      'options': {
        'filename': 'public.pem',
        'contentType': null
      }
    }
  }
};

//настраиваем запрос для проверки установленного вебхука
const optionsToGetWebhookInfo = {
  'method': 'GET',
  'url': `${config.telegram_api_server}bot${config.bot_tocken}/getWebhookInfo`,
  'headers': {
  },
  formData: {
  }
};

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

module.exports.setWebHook = function(callback){
  request(optionsToSetWebhook, function (err, res) { 
    if (err){
      callback(err, null);
    }
    else{
      callback(null, res);
    }
  });
}

module.exports.getWebHookInfo = function(callback){
  request(optionsToGetWebhookInfo, function (err, res) { 
    if (err){
      callback(err, null);
    }
    else{
      callback(null, res);
    }
  });
}