{
    // method to submit the form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            console.log(e);
            e.preventDefault();
            console.log(e);


            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data : newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);

                    new ToggleLike($('.toggle-like-button',newPost));

                    $('#post-list-container>ul').prepend(newPost);

                    new Noty({
                        theme : 'relax' , 
                        text: "Post Created",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();


                    deletePost($(' .delete-post-button',newPost));
                }, error(error){

                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'error',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();

                        
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create data in DOM
    let newPostDom = function(post){
        return $(`
                <div id="post-${post._id}" class="posts-blocks">
                    <p>
                            <small style="font-size:1.3rem; color: black;">${post.user.name}</small>
                            <br>
                            <p class="post-content">${post.content}</p>
                    
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash icon"></i></a>
                                </small>
                            <small>
                                
                                    
                                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 <i class="fas fa-thumbs-up"></i>
                                    </a>
                        
                                    
                            
                            </small>
                    </p>
                
                    <div class="post-comments">
                    
                        <form action="/comments/create" method="POST" id="new-comment-form">
                            <input type="text" name="content" placeholder="type here to add comment....." required>
                            <input type="hidden" name="post" value="${post._id }">
                            <input type="submit" value="Add Comment">
                        </form>
                    
                
                        <div class="post-comment-list">
                            <ul class="post-comment-lists" id="post-comments-${post._id}">
                            </ul>
                        </div>
                    </div>
                </div>
     

            `)
    }


    // method to delete the post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Post Removed",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();


                },error(error){

                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'error',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();


                    console.log(error.responseText);
                }
            });
        });
    }





    createPost();
}  
