 const {EQUITY,DERIVATIVE,MF,IPO} = require('../models/chat');

module.exports.chat=async function(req,res){
    let chats;
    const room=req.params.room;
    if(room=='Equity')
    {
        chats=await EQUITY.find({});
    }else if(room=='Derivatives'){
        chats=await DERIVATIVE.find({});
    }else if(room=='MutualFunds'){
        chats=await MF.find({});
    }else if(room=='IPO'){
        chats=await IPO.find({});
    }
    res.render('_chatroom.ejs',{
        title:`${req.params.room} Room`,
        messages:chats,
        room:req.params.room
    });
}
module.exports.destroy=async function(req,res){
    //console.log(req.params.id);
    let message=await EQUITY.findById(req.params.id);
    console.log("I am mess",message);
    if(message!=undefined)
    {
        message.remove();
        if (req.xhr){
            console.log("Its a xhr req");
            return res.status(200).json({
                data: {
                    message_id: req.params.id
                },
                message: "Message deleted"
            });
        }
    }
    message=await DERIVATIVE.findById(req.params.id);
    if(message!=undefined)
    {
        message.remove();
        if (req.xhr){
            return res.status(200).json({
                data: {
                    message_id: req.params.id
                },
                message: "Message deleted"
            });
        }
    }
    message=await IPO.findById(req.params.id);
    if(message!=undefined)
    {
        message.remove();
        if (req.xhr){

            return res.status(200).json({
                data: {
                    message_id: req.params.id
                },
                message: "Message deleted"
            });
        }
    }
    message=await MF.findById(req.params.id);
    if(message!=undefined)
    {
        message.remove();
        if (req.xhr){
            return res.status(200).json({
                data: {
                    message_id: req.params.id
                },
                message: "Message deleted"
            });
        }
    }
    
    
}