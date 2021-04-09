const User = require('../models/user');
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

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:'Codeial'
    }
    );
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user in signing up!");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user while signing up!");
                    return;
                } 
                return res.redirect('./sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
    
};

//sign in and create a session for user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}