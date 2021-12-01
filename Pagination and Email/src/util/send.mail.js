const transporter=require("../config/mail"); 

module.exports=(from, to, subject,text,html)=>{
var message = {
    from,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(message);
}