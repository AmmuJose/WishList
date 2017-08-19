var mailConfig = require('../config/mail');
var nodemailer = require('nodemailer');
var options = function (receiver, userName, baseUrl, title) {
    var message = "Hi,<br><br>" + userName + " has shared her " +  title + " with you. ";
        message += "Please visit <a href='"+ baseUrl +"'>Wish List App</a> to see the List.<br><br>" ;
        message += baseUrl + "<br><br>Thank You,<br>Wish List Team.";
    return {
        from: mailConfig.auth.user,
        to: receiver,
        subject: 'Wish List',
        html: message
    }
};

var transporter = nodemailer.createTransport({
    service: mailConfig.service,
    auth: mailConfig.auth
});

module.exports = {
    sendMail: function (receiver, userName, baseUrl, tilte) {
        transporter.sendMail(options(receiver, userName, baseUrl, tilte),
            function (error, info) {
                if (error) {
                    console.log(error);
                } else {

                }
            });
    }
};