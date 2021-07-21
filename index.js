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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSocket(chatServer);
chatServer.listen(5000);
console.log('chat server listening on port : 5000');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads parts available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


app.use(epressLayouts);

//extract style and script from subpages into the layout
 //app.set('layout extractStyles',true);
 //app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'Codeial',
    //todo change the secret later which deployed on server
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
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

app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes/index'));  


app.listen(port,function(err) {
    if(err){
        // console.log("Error in server side:  ",err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log("Server runnning on port :",port);
    
})