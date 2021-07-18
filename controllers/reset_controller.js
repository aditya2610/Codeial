const crypto = require('crypto');
const User = require('../models/user');
const ResetPasswordToken = require('../models/reset_password_token');
const resetpasswordMailer = require('../mailers/forgot_password_mailer');

module.exports.sendResetMail =function(req, res){
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        if(!user){
            console.log("Can not find User!");
            return;
        }
        if(user){
            ResetPasswordToken.create({
                user: user.id,
                accessToken: crypto.randomBytes(20).toString('hex'),
                is_Valid:true
            },function(err,newToken){
                if(err){
                    console.log("Error in ACCESS TOKEN",err);
                    return;
                }
                resetpasswordMailer.forgot_password(`http://localhost:8000/users/reset_password_page/${newToken.accessToken}`,req.body.email);
                return res.render("mail_page",{
                    mail: req.body.email,
                    title: 'Reset Password'
                });
            })
        }

    });
    
}

module.exports.reset_password_page = function(req,res){
    ResetPasswordToken.findOne({accessToken: req.params.id},function(err,token){
        if(err){
            console.log("Error in token",err);
            return;
        }
        if(token){
            return res.render("change_password_page",{
                token: token,
                title: "Please Reset Your Password!"
            });
        }

    });
}

module.exports.change_password = function(req,res){
    ResetPasswordToken.findOne({accessToken: req.params.id},function(err,token){
        if(err){
            console.log('Error in finding token');
            return;
        }
        if(token){
            User.findOne(token.user, function(err, user){
                if(err){
                    console.log('Error in finding token');
                    return;
                }
                if(user){
                    if(req.body.password !=req.body.confirm_password)
                    {
                        console.log("Password Invalid!!");
                        req.flash('error','Password doesnot match');
                        res.redirect(`/users/reset_password_page/${token.accessToken}`);
                    }
                    else{
                        user.password=req.body.password;
                        user.save();
                        token.is_Valid=false;
                        token.save();
                        req.flash('success','Password Changed Successfully');
                        return res.redirect('/users/sign-in');
                    }
                }
            })
        }

    })
}

