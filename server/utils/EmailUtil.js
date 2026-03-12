const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS
  }
});

const EmailUtil = {
  send(email, id, token) {
    const text =
      'Thanks for signing up, please input these informations to activate your account:\n' +
      'id: ' + id + '\n' +
      'token: ' + token;

    return new Promise(function (resolve, reject) {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Signup | Verification',
        text: text
      };

      transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.error('Lỗi gửi mail:', err); // In lỗi ra Terminal để dễ theo dõi
          resolve(false); // SỬA Ở ĐÂY: Trả về false để API báo lỗi nhẹ nhàng, KHÔNG làm sập Server
        } else {
          resolve(true);
        }
      });
    });
  }
};

module.exports = EmailUtil;