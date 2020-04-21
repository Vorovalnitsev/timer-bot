const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

//Модель содержит идентификатор обновления web-хука update_id
const IncommingMessageSchema = new Schema({
    update_id: { type: Number },
    timer_is_active: { type: Boolean, default: false }
});

module.exports.TimerModel = Model('timer', IncommingMessageSchema);
