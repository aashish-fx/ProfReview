const express = require("express");
const Profile = require("../models/profprofile");
const router = express.Router();
router.get('/search/:profileId',(req,res,next)=>{
  const profileId = req.params.profileId;
  console.log(profileId);
  Profile.findById(profileId)
  .then(post=>{
    if(!post)
    {
      console.log("Post not found");
    }
    res.status(200).json({post:post});
    next();
  })
  .catch(err=>{
    console.log(err);
  })
})
router.get("/search", (req, res, next) => {
  Profile.find()
    .then((result) => {
      res.status(200).json({ profiles: result });
   
    })
    .catch((err) => console.log(err));
});

module.exports = router;
