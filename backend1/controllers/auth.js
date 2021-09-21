const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))
const User = require('../models/user');


exports.signup = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const date = new Date().toISOString();
    User.findOne({email:email})
    .then(userDoc=>{
        if (userDoc){
            const error = new Error('E-mail already Exist');
            error.statusCode = 501;
            throw error;
        }
      return bcrypt.hash(password,12)
    .then(hashedpass=>{
        const user = new User({
            email:email,
            password:hashedpass,
            name:name,
            confirmPassword:confirmPassword,
            date:date
        
        });
        crypto.randomBytes(32,(err,buffer)=>{
            if(err)
            {
                const error = new Error('Error accured');
                error.statusCode(500);
                throw err;   
            }
            const token  = buffer.toString('hex');
            user.resetToken = token;
            user.resetTokenExpiration = Date.now()+3600000;

        })
        return user.save();
    })
    .then(result=>{
        res.status(201).json({message:'User Created!',userId: result._id});

        return transporter.sendMail({
            to:result.email,
            from:'ash569sharma@gmail.com',
            subject:'Verify your account',
            html:`
                    <p>Verify your account</p> 
                    <p> Click this <a href="http://localhost:3000/login/${result.resetToken}">Link </a> to verify.</p>  
                `
        });
    });
    })
    .catch(err=>{
        console.log(error);
    });
};
exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user)
        {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual)
        {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
              email: loadedUser.email,
              userId:loadedUser._id.toString()
            },
            'somesupersecret',
            {expiresIn:'1h'}
        );
        res.status(200).json({token:token,userId:loadedUser._id.toString(),userName:loadedUser.name});
    }
    )
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err);

    });
};
exports.reset = (req,res,next)=>{
   crypto.randomBytes(32,(err,buffer)=>{
       if(err)
       {
            const error = new Error('Error accured');
            error.statusCode(500);
            throw err;   
       }
       const token  = buffer.toString('hex');
       User.findOne({email:req.body.email})
       .then(user=>{
        if(!user)
        {
            const error = new Error('A user with this email could not be found.');
            error.statusCode(500);
            throw error;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now()+3600000;
        return user.save();
       })
        .then(result=>{
            
            transporter.sendMail({
                to:req.body.email,
                from:'ash569sharma@gmail.com',
                subject:'Password Reset',
                html:`
                    <p>You requested a password reset </p> 
                    <p> Click this <a href="http://localhost:3000/auth/reset/${token}">Link </a> to set a new password.</p>  
                `
        })
    })
       
       .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        
       });
   })
}

exports.newPassword = (req,res,next)=>{
    const token = (req.body.param);
    const newPassword = req.body.password;
    console.log(token, newPassword);
    
    User.findOne({resetToken:token, resetTokenExpiration:{$gt: Date.now()}})
    .then(user=>{
        if(!user)
        {   console.log('user Not found');
            const error = new Error('Something Went Wrong');
            error.statusCode = 500;
            throw error;
        }
         bcrypt.hash(newPassword,12).then(hashedPassword=>{
            user.password=hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            return user.save(); 
        })
    })
    
    .then(result=>{
       res.json({message:"password updated"})
    })
    .catch(error=>{
        console.log(error);
        
    });

}
