const express = require('express');
const port= 8000;
const app= express();
const cookieParser = require('cookie-parser');
const epressLayouts = require('express-ejs-layouts');
const db =require('./config/mongoose');
const { urlencoded } = require('express');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(epressLayouts);

//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router


app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes/index'));

app.listen(port,function(err) {
    if(err){
        // console.log("Error in server side:  ",err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log("Server runnning on port :",port);
    
})