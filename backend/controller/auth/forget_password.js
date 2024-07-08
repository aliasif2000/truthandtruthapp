const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
let checkSendMail;
const deleteOtp = (req) => {
  checkSendMail = setTimeout(async () => {
    try {
      console.log("Otp is Delete");
      await prisma.otp.delete({
        where: {
          email: req.body.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, 300000);
};
sendMail = (name, email, otp, res, req) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SECRET_EMAIL,
      to: email,
      subject: "Reset Truth and Truth App Password",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
            <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">Here is your OTP for resetting your password (expires in 5 minute):</p>
            <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 24px;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">Please enter this OTP in the app to proceed with password reset.</p>
          </div>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        res.status(500).send("Failed to send email.");
      } else {
        res.status(200).json({ message: "Email has been sent." });
        deleteOtp(req);
      }
    });
  } catch (error) {
    console.error("Error in sendMail function:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = forgerPasswordController = async (req, res) => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const checkOtpUser = await prisma.otp.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!checkUser) {
      return res.status(401).send("Invalid Credentials.");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    if (checkOtpUser) {
      await prisma.otp.update({
        where: { email: req.body.email },
        data: { otp },
      });
    } else {
      await prisma.otp.create({ data: { email: req.body.email, otp } });
    }
    //check if mail
    if (checkSendMail) {
      clearTimeout(checkSendMail);
    }
    sendMail(checkUser.username, checkUser.email, otp, res, req);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
