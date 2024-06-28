const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = sendMail = (name, email, token, otp, res, req) => {
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
            <p style="font-size: 16px; line-height: 1.6;">Here is your OTP for resetting your password (expires in 1 minute):</p>
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
        res.status(200).json({ message: "Email has been sent.", token });
        setTimeout(async () => {
          console.log("Otp is Delete");
          await prisma.otp.delete({
            where: {
              email: req.body.email,
            },
          });
        }, 60000);
      }
    });
  } catch (error) {
    console.error("Error in sendMail function:", error);
    res.status(500).send("Internal Server Error");
  }
};
