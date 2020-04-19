const express = require('express');
const fs = require('fs');
const https = require('https');
const telegram = require('./services/telegram.js');
const bodyParser = require('body-parser');
const async = require('async');
const config = require('./config.json');
const routes = require('./routes.js').routes;
const app = express();



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
      key: fs.readFileSync(config.https_server.certificates.private),
      cert: fs.readFileSync(config.https_server.certificates.public)
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
    telegram.setWebHook(function(err, res){
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
    })
  },
  function(callback){
    console.log('*********************************************');
    console.log('Getting webhook info');
    telegram.getWebHookInfo(function(err, res){
      if (err){
        console.log(err);
        callback(true);
      }
      else{
        console.log(`Response from telegram API ${res.body}`);
        tmpRes = JSON.parse(res.body);

        if(tmpRes.result && tmpRes.result.last_error_message){
            callback(true);
        }
        else{
          callback(null);
        }
      }
    })
  }
],
function(err, results) {
    if (err){
      console.log('Bot-server was not started');
      process.exit(0);
    }
    else{
      console.log('Bot-server is started');
    }
}
)
