class Reply{constructor(e){this.reply(e)}reply(e){$(e).click((function(t){t.preventDefault();let s=$(e).attr("href");$("#message-input").val(`Replying to ${s}--\x3e `),$("#reply-link").val(""+s)}))}}class Delete{constructor(e){this.delete_message(e)}delete_message(e){$(e).click((function(t){t.preventDefault(),console.log("Message to be deleted=  ",e),console.log($(e).attr("href")),$.ajax({type:"get",url:$(e).attr("href"),success:function(e){console.log("Mesaage deleted... ",e.data.message_id),$("#"+e.data.message_id).remove(),new Noty({theme:"relax",text:"Message Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}