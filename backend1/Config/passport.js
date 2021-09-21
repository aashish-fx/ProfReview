const mongoose = require("mongoose");
const GoogleUser = require("../models/GoogleAuth");
const passport =  require("passport");
const keys = require('./key');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    GoogleUser.findById(id)
    .then(user=>{
        done(null,user);
    })
})
passport.use(
    new GoogleStrategy(
        {
            clientID:keys.googleClientId,
            clientSecretkeys:keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy:true
        },
        (accessToken,refreshToken,profile,done)=>{
            console.log(profile);
            User.findOne({googleId:profile.id})
            .then(existingUser=>{
                if(existingUser){
                    done(null,existingUser);
                }
                else{
                    new GoogleUser({
                        name:profile.name,
                        email:profile.email[0].value,
                        photo:profile.photos[0].value.split("?")[0]
                    })
                    .save()
                    .then(user=>{
                        done(null,user)
                    });
                }
            })
        }
    )
)