{let e=function(){let e=$("#new-comment-form");e.submit((function(n){n.preventDefault(),$.ajax({type:"POST",url:"/comments/create",data:e.serialize(),success:function(e){let n=t(e.data.comments);new ToggleLike($(".toggle-like-button",n)),$("#post-comments-"+e.data.comments.post).prepend(n),new Noty({theme:"relax",text:"Comment Created",type:"success",layout:"topRight",timeout:1500}).show(),o($(" .delete-comment-button",n)),console.log(e.data.comments)},error(e){new Noty({theme:"relax",text:e.responseText,type:"error",layout:"topRight",timeout:1500}).show(),console.log(e.responseText)}})}))},t=function(e){return $(`\n            <li id="comment-${e._id}">\n                <p>\n                    <small>\n                        <a class="delete-comment-button" href="/comments/destroy/${e._id}">Delete</a>\n                    </small>\n                    ${e.content}\n                    <br>\n                    <small>${e.user.name}</small>\n\n                    <br>\n                    <small>\n                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">\n                            0 Likes\n                        </a>\n                    </small>\n                </p>\n        </li>`)},o=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log(e),$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Removed",type:"success",layout:"topRight",timeout:1500}).show()},error(e){new Noty({theme:"relax",text:e.responseText,type:"error",layout:"topRight",timeout:1500}).show(),console.log(e.responseText)}})}))};e()}