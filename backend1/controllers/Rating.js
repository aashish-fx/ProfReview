const Rating  = require("../models/rating");
const {validationResult}  = require('express-validator/check');
exports.sendPost = (req,res,next)=>{
    const rating = req.body.rating;
    const message = req.body.message;
    const ratings = new Rating({
        rating:rating,
        message:message,
        user:req.body.user
    });
    console.log(ratings);
    ratings.save()
    .then(result=>{
        res.status(201).json({post:result});
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getPosts = (req,res,next)=>{
    Rating.find()
    .then(result=>{
        res.status(200).json({ratings:result});
    })
    .catch(err=>{
        console.log(err);
    })
}