const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req,res){

    console.log("Toggle like");
    try{
        // likes/toggle/?id:asdfd&type=PostorComment
        
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');

        }


        // check if like already exist

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });


        // if like already existing then delete it else make a new like
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;

        }else{

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message:"Request Successfully",
            data:{
                deleted: deleted
            }
        });




    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Error found'
        });
    }
}