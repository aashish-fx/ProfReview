const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        
        content:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
         },
        creator:{
            type:Object,
            required:String
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('POST',postSchema);