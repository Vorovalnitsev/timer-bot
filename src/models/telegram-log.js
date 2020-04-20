const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

const IncommingMessageSchema = new Schema({
    message_id: { type: Number },
    from: {
        id: { type: Number, default: 0 },
        is_bot: { type: Boolean, default: false },
        first_name: { type: String, default: 'n/a' },
        last_name: { type: String, default: 'n/a' },
        username: { type: String, default: 'n/a' },
        language_code: { type: String, default: 'n/a' }
    },
    chat: {
        id: { type: Number, default: 0 },
        first_name: { type: String, default: 'n/a' },
        last_name: { type: String, default: 'n/a' },
        username: { type: String, default: 'n/a' },
        type: { type: String, default: 'n/a' }
    },
    date: { type: Number, default: 0 },
    text: { type: String, default: 'n/a' },
    full_message: {  type: String, default: 'n/a' }
});

module.exports.IncommingMessageModel = Model('IncommingMessage', IncommingMessageSchema);
