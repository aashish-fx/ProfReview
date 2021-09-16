const Message = require('../models/messgae');
const {validationResult}  = require('express-validator/check');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

exports.sendPost = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error = new Error('Something went wrong');
        error.statusCode = 422;
        throw error;
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const email = req.body.email;
    const mess = req.body.message;
    const message = new Message({
        firstName:firstName,
        lastName:lastName,
        contact:contact,
        email:email,
        message:mess
    });
    message.save()
    .then(result=>{
        res.status(201).json({message:result});
        console.log('messageSent');
        return transporter.sendMail({
            to:email,
            from:'ash569sharma@gmail.com',
            subject:'Message Sent',
            html:`<h1>Thank You ${result.firstName} for Contacting with us!</h1>`
        });
    })
    .catch(err=>{
        console.log(err);
    });
}