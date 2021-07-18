const nodeMailer = require('../config/nodemailer');


exports.forgot_password = (link,mail) => {
    let htmlString = nodeMailer.renderTemplate({link},'/resetPassword/reset.ejs');
    
    nodeMailer.transporter.sendMail({
        from: 'adityaagarwal109@gmail.com',
        to: mail,
        subject: "Reset Password",
        html: htmlString

    }, (err, info) => {
        if(err){
            console.log("Error in sending mail for reset password",err);
            return;
        }

        console.log('Message sent',info);
        return;
    });
};