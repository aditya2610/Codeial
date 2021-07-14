module.exports.index = function(req, res){
    return res.json(200,{ 
        message:"List of posts",
        posts: []
    })
}

module.exports.destroy = async function(req,res){

    try{
        let post =await Post.findById(req.params.id);
    
        if(post.user == req.user.id){
            post.remove();


            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message:"Post and associated Comments are deleted Successfully"
            });

            
        }
        else{
            return res.json(401,{
                message:"You cannot delete the post"
            });
        }
    }catch(err){
        console.log("********", err);
        return res.json(500,{
            message:"Internal Server Error"
        }); 
    }
};
