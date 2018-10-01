const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    start: { type: Date, required: true },
    title: { type: String, required: true }
   });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);