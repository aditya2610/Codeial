const Comments = require('../models/comment');
const Post = require('../models/post');
const User=require('../models/user');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create =async function(req,res){
    try{
        let post =await Post.findById(req.body.post);
    
        if(post){
            let comment =await Comments.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            comment = await comment.populate('user name email').execPopulate();

            //commentsMailer.newComment(comment);

            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('Error in creating queue',err);
                    return;
                }
                console.log(job.id);
            });


            post.comments.push(comment);
            post.save();
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comments: comment
                    },
                    message : "Comment created!!"
                });
            }
            req.flash('success','Comment Created!!'); 
            res.redirect('/');
        }
    }catch(err){
        req.flash('error','Comment Not Created!!');
        return req.redirect('/');
    };
};


module.exports.destroy =async function (req, res){
    try{
        let comment =await Comments.findById(req.params.id);
        if(comment.user == req.user.id){

            

            let postid= comment.post;
            
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            comment.remove();

            await Post.findByIdAndUpdate(postid,{$pull: {comments: req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message : "Comment deleted!!"
                });
            }

            req.flash('success','Comment Removed!!');
            return res.redirect('back');
        }else{
            req.flash('error','Not Authorized to delete Comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
            return res.redirect('back');
    }

};