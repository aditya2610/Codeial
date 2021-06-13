const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req,res) {
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path:'user'
        }
    })
    .exec(function(err,post){

        User.find({},function(err,users){
            return res.render('home',{
                post:post,
                all_user:users,
                title:'Codeial | home'
            });
        });    
    });
    
};