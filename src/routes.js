var config = require('./config.json');
var controller404 = require('./controllers/404.js');
var controller500 = require('./controllers/500.js');
var controllerStart = require('./controllers/start.js').start;
var controllerHelp = require('./controllers/help.js').help;
var controllerSetTimer = require('./controllers/timers.js').setTimer;
var controllerTelegramLog  = require('./controllers/telegram-log.js');

module.exports.routes = function(app){
    app.post(`/${config.bot_tocken}`, function (req, res) {
        //console.log(req.body);
        controllerTelegramLog.saveIncommingMessage(req.body);
        if (req.body.message && req.body.message.text){
            if (req.body.message.text == '/start'){
                controllerStart(req.body);
            }
            if (req.body.message.text.startsWith('/help')){
                controllerHelp(req.body);
            }
            if (req.body.message.text.match(/^\d{1,} min\s{0,}$/)){
                controllerSetTimer(req.body);
            }
        }
        res.send();
    })

    //Не найден путь    
    app.use(controller404.index);
    //Что-то пошло не так
    app.use(controller500.index);
}

