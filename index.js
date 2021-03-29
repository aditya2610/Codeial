const express = require('express');
const port= 8000;
const app= express();

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err) {
    if(err){
        // console.log("Error in server side:  ",err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log("Server runnning on port :",port);
    
})