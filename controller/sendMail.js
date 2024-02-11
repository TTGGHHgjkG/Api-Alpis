require('../settings'); // Pastikan konfigurasi sudah dimuat sebelum menggunakan
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: process.env.USER_EMAIL_PROVIDER,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_APP_PASSWORD
  }
});

// Fungsi untuk mengirim email reset password
module.exports.sendResetEmail = async (email, token) => {
  return new Promise((resolve, reject) => {
    const url = `http://${process.env.DOMAIN}/reset-password?token=${token}`; // Pastikan DOMAIN telah didefinisikan di file settings

    const mailOptions = {
      from: {
        name: process.env.USER_NAME,
        address: process.env.USER_EMAIL
      },
      to: email,
      subject: 'Reset Password',
      html: `
      <div style="padding:20px;border:1px dashed #222;font-size:15px">
        <tt>Hai 👋🏻<br><br>
        Konfirmasikan email Anda untuk dapat digunakan. Kirim kode ini ke bot dan masa berlakunya akan habis dalam 3 menit.<br>
        Atau klik url untuk menuju ke browser : <a href="${url}">${url}</a><br><br>
        <hr style="border:0px; border-top:1px dashed #222"><br>
        Regards, <b>${process.env.USER_NAME}</b>
        </tt>
      </div>
      `
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('[!] Warning SMTP error, Limit Habis:', error);
        resolve('error');
      } else {
        console.log('Email reset password berhasil dikirim:', info.response);
        resolve();
      }
    });
  });
};

// Fungsi untuk mengirim email verifikasi
module.exports.sendVerifyEmail = async (email, token) => {
  return new Promise((resolve, reject) => {
    const url = `http://${process.env.DOMAIN}/verifyemail?token=${token}`; // Pastikan DOMAIN telah didefinisikan di file settings

    const mailOptions2 = {
      from: {
        name: process.env.USER_NAME,
        address: process.env.USER_EMAIL
      },
      to: email,
      subject: 'Email Verification',
      html: `
      <div style="padding:20px;border:1px dashed #222;font-size:15px">
        <tt>Hai hai👋🏻<br><br>
        Konfirmasikan email Anda untuk dapat digunakan. Kirim kode ini ke bot dan masa berlakunya akan habis dalam 3 menit.<br>
        Atau klik url untuk menuju ke browser : <a href="${url}">${url}</a><br><br>
        <hr style="border:0px; border-top:1px dashed #222"><br>
        Regards, <b>${process.env.USER_NAME}</b>
        </tt>
      </div>
      `
    };

    transport.sendMail(mailOptions2, (error, info) => {
      if (error) {
        console.error('[!] Warning SMTP error, Limit Habis:', error);
        resolve('error');
      } else {
        console.log('Email verifikasi berhasil dikirim:', info.response);
        resolve();
      }
    });
  });
};
