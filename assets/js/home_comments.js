{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comments);
                    $(`#post-comments-${data.data.comments.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));
                    console.log(data.data.comments);
                }, error(error){
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
                    $(`comment-${data.data.comment_id}`).remove();
                },error(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    

     createComment();
}