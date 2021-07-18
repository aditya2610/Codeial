const Post = require('../models/post');
const User = require('../models/user');

let pops=async function(posts){
    for(postX of posts){
        await postX.populate('user name').execPopulate();
    }
    return posts;
}

let pop=async function(posts){
    for(postX of posts){
        for(commentX of postX.comments){
            await commentX.populate('user name').execPopulate();
        }
    }
    return posts;
}
module.exports.home =async function(req,res) {

    try{
        let posts =await Post.find({})
        .sort('-createdAt')
        .populate('user name')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            },
            populate: {
                path: 'Likes'
            }
        }).populate('Likes');

        let users =await User.find({});
        posts = await pops(posts);
        posts=await pop(posts);
        return res.render('home',{
            posts:posts,
            all_user:users,
            title:'Codeial | home'
        });
    }catch(err){
        console.log("Error found!",err);
    }
   
};