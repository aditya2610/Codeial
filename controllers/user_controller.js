const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('./profile');
    }

    return res.render('sign-up',{
        title:'Codeial'
    }
    );
};

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('./profile');
    }
    return res.render('sign-in',{
        title:'Codeial'
    }
    );
};

module.exports.profile =async function(req,res){
    try{
        let users =await User.findById(req.params.id);
        return res.render('profile',{
        title:'Codeial',
        profile_user : users
        });
    }catch(err){
        req.flash('error','No profile found!');
    }

    
};

module.exports.update = async function(req,res){
    
    if(req.user.id == req.params.id){
        try{
            let user =await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('********Multer Error',err);
                }
                
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                    }
                    // This is saving the path of the uploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename ; 
                }
                user.save();
                req.flash('success','Profile Pic uploaded!');
                return res.redirect('back');
            })

        }catch(err){
            res.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized!!');
        return res.status(401).send('Unauthorized!');
    }

};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Wrong Password Set!');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('error','Error in finding user in signing up!');
            return res.redirect('back');
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    req.flash('error','Error in Creating user in signing up!');
                    return res.redirect('back');
                }
                req.flash('success','User Created Successfully!'); 
                return res.redirect('./sign-in');
            })
        }else{
            req.flash('error','User Already Created!');
            return res.redirect('back');
        }
    })
    
};

//sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged In Successfully!');
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You are logged out!');
    return res.redirect('/');
}

