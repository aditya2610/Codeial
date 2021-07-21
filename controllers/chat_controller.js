 const {EQUITY,DERIVATIVE,MUTUALFUND,IPO} = require('../models/chat');

module.exports.chat=async function(req,res){
    let chats;
    const room=req.params.room;
    if(room=='Equity')
    {
        chats=await EQUITY.find({});
    }else if(room=='Derivatives'){
        chats=await DERIVATIVE.find({});
    }else if(room=='Mutual-funds'){
        chats=await MUTUALFUND.find({});
    }else if(room=='IPO'){
        chats=await IPO.find({});
    }
    res.render('_chat_box.ejs',{
        title:`${req.params.room} Room`,
        messages:chats,
        room:req.params.room
    });
}
module.exports.destroy=async function(req,res){
    console.log(req.params.id);
    let message=await EQUITY.findById(req.params.id);
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
    message=await MUTUALFUND.findById(req.params.id);
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