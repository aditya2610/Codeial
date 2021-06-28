{
    // method to submit the form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data : newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create data in DOM
    let newPostDom = function(post){
        return $(`
            <li id="post-${post._id}">
                    <p> 
                        <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                        </small>
                        ${post.content}
                    <br>
                    <small>${post.user.name}</small>
                    </p>
                    <div class="post-comments">
                    
                        <form action="/comments/create" method="POST" id="new-comment-form">
                            <input type="text" name="content" placeholder="type here to add comment....." required>
                            <input type="hidden" name="post" value="${post._id }">
                            <input type="submit" value="Add Comment">
                        </form>
                    

                    <div class="post-comment-list">
                        <ul id="post-comments-${ post._id}">
                        </ul>
                    </div>
                    </div>
            </li>`)
    }


    // method to delete the post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },error(error){
                    console.log(error.responseText);
                }
            });
        });
    }





    createPost();
}  
