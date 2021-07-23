
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');



const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'blahsomething',
    db : 'stocktalks_development' ,
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'adityaagarwal109@gmail.com',
            pass : 'Aditya@26101998'
        }
     
    },
    google_client_id: "42607784427-k8a1jmigdlk50ldftj8odlu8cr1md9s0.apps.googleusercontent.com",
    google_client_secret : "G89N1Fq_UEyPcKiWTy7uzVMt",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}

const production = {
    name: 'production',
    asset_path: process.env.STOCKTALK_ASSETPATH,
    session_cookie_key:process.env.STOCKTALK_SESSION_COOKIE_KEY,
    db : process.env.STOCKTALK_DB,
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.STOCKTALK_GMAIL_USERNAME,
            pass : process.env.STOCKTALK_GMAIL_PASSWORD
        }
     
    },
    google_client_id: process.env.STOCKTALK_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.STOCKTALK_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.STOCKTALK_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.STOCKTALK_JWT_SECRET,
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }

}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);