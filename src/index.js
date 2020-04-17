var express = require('express');
var fs = require('fs');
var https = require('https');
var request = require('request');
var bodyParser = require('body-parser');
var async = require('async');
var config = require('./config.json');
var routes = require('./routes.js').routes;
var app = express();

//настраиваем запрос для установки вебхука
var optionsToSetWebhook = {
  'method': 'GET',
  'url': `${config.telegram_api_server}bot${config.bot_tocken}/setWebhook`,
  'headers': {
  },
  formData: {
    'url': `${config.https_server.url}${config.bot_tocken}`,
    'certificate': {
      'value': fs.readFileSync(`${__dirname}/${config.https_server.certificates.public}`),
      'options': {
        'filename': 'public.pem',
        'contentType': null
      }
    }
  }
};

app.use(bodyParser.json());

routes(app);

/*
Сначала запускаем сервер бота, затем отправляем серверу телеграмма запрос на установку вебхука
*/
async.series([
  function(callback){
    console.log('*********************************************');
    console.log('Starting HTTPS server');
    https.createServer({
      key: fs.readFileSync(`${__dirname}/${config.https_server.certificates.private}`),
      cert: fs.readFileSync(`${__dirname}/${config.https_server.certificates.public}`)
    }, app)
    .listen(config.https_server.port, function (err) {
      if(err){
        console.log(err);
        callback(true)
      }
      else{
        console.log('HTTPS server is started');
        console.log(`Go to https://localhost:${config.https_server.port}/`);
        console.log(`Or Go to ${config.https_server.url}`);
        callback(null);
      }  
    });
  },
  function(callback){
    console.log('*********************************************');
    console.log('Setting webhook');
    request(optionsToSetWebhook, function (err, res) { 
      if (err){
        console.log(err);
        callback(true);
      }
      else{
        console.log(`Response from telegram API ${res.body}`);
        tmpRes = JSON.parse(res.body);
        if(tmpRes.result && tmpRes.result == true){
          callback(null);
        }
        else{
          callback(true);
        }
      }
    });
  }
],
function(err, results) {
    if (err){
      console.log('Bot-server was not started');
    }
    else{
      console.log('Bot-server is started');
    }
}
)
