const fs = require('fs');
const path = require('path');
const {validationResult}  = require('express-validator/check');
const Post = require('../models/post');


exports.getPosts = (req, res, next) => {
  
  console.log("hello")
  Post.find()
  .then(posts=>{
    
    res.status(200).json({message:"Fetched posts successfully.",
                posts:posts
              });
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
  })
 
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty())
  {
    const error = new Error("Validation Failed, entered Data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.userName;
  const post = new Post({
    title:title,
    content:content,
    creator:{name:name},
    date:new Date().toISOString(),
    userId:req.body.userId
  });
  console.log(post);
  post.save()
  .then(result=>{
    res.status(201).json({
      message:"post Created!",
      post:result
    });
    
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
    
  });
 
};

exports.getPost = (req,res,next)=>{
  const postId = req.params.postId;
  console.log(postId);
  Post.findById(postId)
  .then(post=>{
    if(!post)
    {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message:'Post fetched',post:post});
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
  });
};


exports.updatePost = (req,res,next)=>{
  const postId = req.params.postId;
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  post.findById(postId)
  .then(post=>{
    if(!post){
       const error = new Error('could not find Post.');
       error.statusCode = 404;
       throw error;     
    }
    post.title = title;
    post.content = content;
    return post.save();
  })
  .then(result =>{
    res.status(200).json({message:"post updated!",post:result});

  })
  .catch(err=>{
    if(!err.statusCode)
    {
      erer.statusCode = 500;
    }
  });
}

exports.deletePost = (req,res,next)=>{
  const postId = req.params.postId;
  Post.findById(postId)
  .then(post=>{
    if(!post){
      const error = new Error('could not find post to delete');
      error.statusCode = 404;
      throw error;
    }
    return Post.findByIdAndDelete(postId);
  })
  .then(result=>{
    res.status(200).json({message:'Post deleted',posts:result});
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
  });
};


