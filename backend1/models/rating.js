const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    rating:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Rating',ratingSchema);
