{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'POST',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comments);

                    new ToggleLike($('.toggle-like-button',newComment));

                    $(`#post-comments-${data.data.comments.post}`).prepend(newComment);

                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Created",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();

                    deleteComment($(' .delete-comment-button',newComment));
                    console.log(data.data.comments);
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
    let newCommentDom = function(comments){
        return $(`
            <li id="comment-${comments._id}">
                <p>
                    <small>
                        <a class="delete-comment-button" href="/comments/destroy/${comments._id}">Delete</a>
                    </small>
                    ${comments.content}
                    <br>
                    <small>${comments.user.name}</small>

                    <br>
                    <small>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comments._id}&type=Comment">
                            0 Likes
                        </a>
                    </small>
                </p>
        </li>`)
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Removed",
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
    

     createComment();
}