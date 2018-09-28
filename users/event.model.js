const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    start: { type: Date, required: true },
    title: { type: String, required: true }
   });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);