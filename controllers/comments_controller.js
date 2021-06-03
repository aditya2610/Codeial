const Comments = require('../models/comment');
const Post = require('../models/post');
const User=require('../models/user');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comments.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log("Error found:",err);
                    return;
                }
                post.comments.push(comment);
                post.save();  

                res.redirect('/');
            });
        }
    });
};


module.exports.destroy = function (req, res){
    Comments.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            
            let postid= comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postid,{$pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
};