const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('../models/post');
const googleUserSchema  = new Schema({
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"I am new"
    },
    
});
module.exports = mongoose.model('GoogleUser',googleUserSchema);