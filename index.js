const express = require('express');
const port= 8000;
const app= express();
const cookieParser = require('cookie-parser');
const epressLayouts = require('express-ejs-layouts');
const db =require('./config/mongoose');

//used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
//const { urlencoded } = require('express');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(epressLayouts);

//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'Codeial',
    //todo change the secret later which deployed on server
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    },
    store: new MongoStore({
        moogooseConnection:db,
        autoRemove:'disabled'
         
    },
    function(err){
        console.log(err || "connect mongodb session setup");
    })
}));
 

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));  


app.listen(port,function(err) {
    if(err){
        // console.log("Error in server side:  ",err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log("Server runnning on port :",port);
    
})