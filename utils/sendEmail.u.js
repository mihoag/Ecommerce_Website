const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const tokenM = require("../models/token.m");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  sendMail: async function (toEmail) {
    const token = jwt.sign({ email: toEmail }, JWT_SECRET);

    const link = `${process.env.ROOT_SERVER}/auth/verify/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gamil.com",
      port: 587,
      secure: false,
      auth: {
        user: "nguyennhathao01012003@gmail.com",
        pass: "jvvs tjjh vgbb jekt",
      },
    });

    const mailOptions = {
      from: "admin@gmail.com",
      to: toEmail,
      subject: "Verify Email Address",
      html: require("./contentEmail")(link),
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        await tokenM.add(token);
        console.log("Email sent: " + info.response);
      }
    });
  },
  sendCode: async function (toEmail, code) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gamil.com",
      port: 587,
      secure: false,
      auth: {
        user: "nguyennhathao01012003@gmail.com",
        pass: "jvvs tjjh vgbb jekt",
      },
    });

    const mailOptions = {
      from: "admin@gmail.com",
      to: toEmail,
      subject: "Code reset password",
      html: require("./contentEmailCode")(code),
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
