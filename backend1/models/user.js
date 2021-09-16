const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('../models/post');
const userSchema  = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
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
    status:{
        type:String,
        default:"I am new"
    },
    posts:{
        post:[{postId:{type:Schema.Types.ObjectId,ref:'POST',required:true}}],
        
    }
});

userSchema.methods.addToCart = function(product){
    const postsArray = Post.find({userId:this._id});
    console.log('****');
    console.log(postsArray);
}
module.exports = mongoose.model('User',userSchema);