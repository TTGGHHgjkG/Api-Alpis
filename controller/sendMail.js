//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

require('../settings')
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
         service: process.env.USER_EMAIL_PROVIDER,
         auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_APP_PASSWORD
   }
})

//―――――――――――――――――――――――――――――――――――――――――― ┏ Send Reset Email┓ ―――――――――――――――――――――――――――――――――――――――――― \\

module.exports.sendResetEmail = async (email, token) => {
  return new Promise(async(resolve, rejecet) => {

  var url = `http://${domain}/reset-password?token=` + token;
  const mailOptions = {
         from: {
            name: process.env.USER_NAME,
            address: process.env.USER_EMAIL
         },
         to: args[0],
         subject: 'Email Verification',
         html: `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Hai <b>👋🏻</b><br><br>Konfirmasikan email Anda untuk dapat digunakan . Kirim kode ini ke bot dan masa berlakunya akan habis dalam 3 menit.<br><center><h1></h1></center>Atau klik url untuk menuju ke browser : <a href=""></a><br><br><hr style="border:0px; border-top:1px dashed #222"><br>Regards, <b>b></tt></div>`
      }
  transport.sendMail(mailOptions, function(error, info) => {
    if (error) {
      resolve('error')
      console.log(`[!] Warning SMTP error ,Limit Habis`);
    } else{
      resolve()
    }
  });

  })

}

//―――――――――――――――――――――――――――――――――――――――――― ┏ Send Verify Email ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

module.exports.sendVerifyEmail = async (email, token) => {
  return new Promise(async(resolve, rejecet) => {
    var url = `http://${domain}/verifyemail?token=` + token;

        const mailOptions2 = {
         from: {
            name: process.env.USER_NAME,
            address: process.env.USER_EMAIL
         },
         to: args[0],
         subject: 'Email Verification',
         html: `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Hai <b>hai👋🏻</b><br><br>Konfirmasikan email Anda untuk dapat digunakan . Kirim kode ini ke bot dan masa berlakunya akan habis dalam 3 menit.<br><center><h1></h1></center>Atau klik url untuk menuju ke browser : <a href="">kosong</a><br><br><hr style="border:0px; border-top:1px dashed #222"><br>Regards, <b></b></tt></div>`
      }

  transport.sendMail(mailOptions2, function(error, info) => {
  if (error) {
    resolve('error')
    console.log(`[!] Warning SMTP error ,Limit Habis`);
  } else{
    resolve()
  }
});

})

}

//―――――――――――――――――――――――――――――――――――――――――― ┏  Make by Alip ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
