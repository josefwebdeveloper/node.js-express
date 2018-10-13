const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: true },
    provider:{type:String,required:false},
    image:{type:String,required:false},
    createdDate: { type: Date, default: Date.now }
    // token:{type:String,required:false}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);