const TimerModel = require('../models/timer-log').TimerModel;

module.exports.newTimer = function (update_id, timer_is_active, callback){
    let timer = new TimerModel();
    
    timer.update_id = update_id;
    timer.timer_is_active = timer_is_active;
    timer.save(function(err, timer){
        if(err){
            console.log(err);
            callback(err, null);
        }
        else{
            callback(null, timer)
         }
    });
}

module.exports.updateTimer = function (timer){
    TimerModel.updateOne(
        { _id: timer._id }, 
        {
            timer_is_active: timer.timer_is_active, 
            update_id: timer.update_id 
        }, 
        function(err){
            if(err){
                console.log(err);
            }
        }
    );  
}