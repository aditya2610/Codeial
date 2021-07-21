class ChatEngine{
    constructor(chatBoxId, room, userEmail, userName){
        console.log(userName);
        this.chatBox = $(`#${chatBoxId}`);
        this.chatRoom=room; 
        this.userEmail = userEmail;
        this.userName=userName;
        this.socket = io.connect('http://localhost:5000', {transports:['websocket', 'polling', 'flashsocket']});
        
        if (this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');
        });

        self.socket.emit('join_room',{
            username:'Chat Bot',
            message:`${self.userName} is online...`,
            user_email:`${self.userEmail}`,
            room_id:`${self.chatRoom}`
        });

        self.socket.on('user_join',function(data){
            let newdiv=document.createElement('div');
            newdiv.classList.add('seperate-message');
            newdiv.innerHTML=`
                    <div class="details">
                        <span>${data.username}</span>
                        <div>
                            <span>${data.date} | </span>
                            <span>${data.time}</span>
                        </div>
                    </div>
                    <div class="message">
                        <span>${data.message}</span>
                    </div>
            `;
            $('#message-list-container').append(newdiv);
            const messageContainer=document.getElementById('message-list-container');
            messageContainer.scrollTop=messageContainer.scrollHeight;
        });


        $('#send-message').click(function(){
            let msg=$('#message-input').val();
            let link=$('#message-link').val();
            let reply=$('#reply-link').val();
            console.log(reply);
            if(reply!='')
            {
                console.log(typeof msg);
                msg=msg.slice(20);
                console.log(msg);
            }
            if(msg!='')
            {
                self.socket.emit('send',{
                    username:self.userName,
                    message:msg,
                    link:link,
                    user_email:self.userEmail,
                    room_id:`${self.chatRoom}`,
                    reply:reply
                });
            }
            $('#message-input').val('');
            $('#message-link').val('');
            $('#reply-link').val('');
            
        })

        self.socket.on('receive',function(data){
            let newdiv=document.createElement('div');
            newdiv.setAttribute("id", `${data.id}`);
            if(data.user_email==self.userEmail)
            {
                if(data.reply!='')  
                {
                    newdiv.innerHTML=`
                    <div class="seperate-message" id="${data.id.slice(20)}">
                        <div class="details" id="user_detail">
                            <div id="user-name">
                                <span>${data.username}</span>
                            </div>
                            <div class="message-setting">
                                <a class="message-reply" href="<%=data.id.slice(20)%>"><i class="fas fa-reply icon"></i></a>&nbsp
                                <a class="message-delete" href="delete/<%=data.id%>"><i class="fas fa-trash icon"></i></a>
                            </div>
                        </div>
                        <div class="message" >
                            <div class="message-detail">
                                <div>Reply:<a href="#${data.reply}">#${data.reply}</a></div>  
                                <span>${data.message} </span>
                                <p><a href="${data.link}" target="_blank">${data.link}</a></p>
                            
                            </div>
                        </div>
                        <div class="message-info">
                            <div>
                                <span> ${data.date} | </span>
                                <span> ${data.time} </span>
                            </div>
                            <div>
                                <span>Message-Id : ${data.id.slice(20)}%></span>
                            </div>
                        </div>
                    </div>
            `   
            }
            else{
                newdiv.innerHTML=`
                    <div class="seperate-message" id="${data.id.slice(20)}">
                        <div class="details" id="user_detail">
                            <div id="user-name">
                                <span>${data.username}</span>
                            </div>
                            <div class="message-setting">
                                <a class="message-reply" href="<%=data.id.slice(20)%>"><i class="fas fa-reply icon"></i></a>&nbsp
                                <a class="message-delete" href="delete/<%=data.id%>"><i class="fas fa-trash icon"></i></a>
                            </div>
                        </div>
                        <div class="message" >
                            <div class="message-detail">
                                <span>${data.message} </span>
                                <p><a href="${data.link}" target="_blank">${data.link}</a></p>
                            
                            </div>
                        </div>
                        <div class="message-info">
                            <div>
                                <span> ${data.date} | </span>
                                <span> ${data.time} </span>
                            </div>
                            <div>
                                <span>Message-Id : ${data.id.slice(20)}%></span>
                            </div>
                        </div>
                    </div>
            `   
            }
            
        }
        else{
            if(data.reply!='')  
            {
                newdiv.innerHTML=`
                <div class="seperate-message" id="${data.id.slice(20)}">
                <div class="details">
                    <div id="user-name">
                        <span> ${data.username} </span>
                    </div>
                    <div class="message-setting">
                        <a class="message-reply" href="${data.id.slice(20)}"><i class="fas fa-reply icon"></i></a>&nbsp
                    </div>
                </div>
                <div class="message">
                    <div class="message-detail">
                        <div>Reply:<a href="#${data.reply}">#${data.reply}</a></div>                               
                        <span>${data.message} </span>
                        <p><a href="${data.link}" target="_blank">${data.link}</a></p>
                    </div>
                </div>
                <div class="message-info">
                    <div>
                        <span> ${data.date} | </span>
                        <span> ${data.time} </span>
                    </div>
                    <div>
                        <span>Message-Id : ${data.id.slice(20)}</span>
                    </div>
                </div>
                </div>              
                `   
                }
                else{
                    newdiv.innerHTML=`
                    <div class="seperate-message" id="${data.id.slice(20)}">
                    <div class="details">
                    <div id="user-name">
                        <span> ${data.username} </span>
                    </div>
                    <div class="message-setting">
                        <a class="message-reply" href="${data.id.slice(20)}"><i class="fas fa-reply icon"></i></a>&nbsp
                    </div>
                </div>
                <div class="message">
                    <div class="message-detail">                                
                        <span>${data.message} </span>
                        
                            <p><a href="${data.link}" target="_blank">${data.link}</a></p>
                        
                    </div>
                </div>
                <div class="message-info">
                    <div>
                        <span> ${data.date} | </span>
                        <span> ${data.time} </span>
                    </div>
                    <div>
                        <span>Message-Id : ${data.id.slice(20)}</span>
                    </div>
                </div>
                    </div>
                    
                `   
                }
            }

            $('#message-list-container').append(newdiv);
            console.log(newdiv);
            const messageContainer=document.getElementById('message-list-container');
            messageContainer.scrollTop=messageContainer.scrollHeight;  
            $('.message-reply').each(function(){
                let self=this;
                let reply=new Reply(self);
            });
            $('.message-delete').each(function(){
                let self=this;
                let delete_message=new Delete(self);
            })
     
    });
    }
}








