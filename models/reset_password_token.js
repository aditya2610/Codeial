const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type: String
    }
    ,
    is_Valid:{
        type: Boolean
    }

},{
    timestamps:true
});


const resetPasswordToken = mongoose.model('resetPasswordToken',resetPasswordSchema);
module.exports = resetPasswordToken;