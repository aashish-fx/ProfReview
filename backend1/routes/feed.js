const express = require('express');
const {body} = require('express-validator/check');
const feedController = require('../controllers/feed');

const isAuth = require('../MiddleWare/is-auth');
const router = express.Router();

// GET /feed/posts
router.get('/feed/posts', feedController.getPosts);

//router.get('/dashboard/:userId',feedController.getdashboardPosts);
// POST /feed/post
router.post('/create-post',
    
  [
      body('title')
      .trim()
      .isLength({min:5}),
    body('content')
    .trim()
    .isLength({min:5})  
  ]
, feedController.createPost);

router.get('/feed/post/:postId',feedController.getPost);

router.put('/feed/post/:postId',isAuth,[
    body('title')
    .trim()
    .isLength({min:5}),
    body('context')
    .trim()
    .isLength({min:5})
],
feedController.updatePost
)
router.delete('/feed/post/:postId',feedController.deletePost);
module.exports = router;