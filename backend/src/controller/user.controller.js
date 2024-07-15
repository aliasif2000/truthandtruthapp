const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("../utils/asyncHandler");
const ApiRespone = require("../utils/ApiRespone");
const ApiError = require("../utils/ApiError");
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

const forgetPassword = asyncHandler(async (req, res) => {
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
  //check if mail already send
  if (checkSendMail) {
    clearTimeout(checkSendMail);
  }
  sendMail(checkUser.username, checkUser.email, otp, res, req);
});
const loginUser = asyncHandler(async (req, res) => {
  const checkUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!checkUser) {
    return res.status(401).send("Invalid Credentials");
  }

  const passwordMatch = await bcrypt.compare(
    req.body.password,
    checkUser.password
  );
  if (!passwordMatch) {
    return res.status(401).send("Invalid Credentials");
  }
  const token = jwt.sign(checkUser.email, process.env.SECRET_KEY);
  return res.status(201).json({ userData: checkUser, token });
});
const otpSend = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }
  const checkEmail = await prisma.otp.findFirst({
    where: {
      email,
    },
  });
  if (!checkEmail) {
    return res.status(401).send("Invalid Email");
  }
  if (checkEmail.otp != otp) {
    return res.status(401).send("Invalid Otp");
  }

  return res.status(201).send("Otp is Valid");
});
const registerUser = asyncHandler(async (req, res) => {
  const checkUsername = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const checkUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (checkUsername) {
    return res.status(400).send("Username is Already Exists");
  }
  if (!checkUser) {
    const hash = await bcrypt.hash(req.body.password, 10);
    const token = jwt.sign(req.body.email, process.env.SECRET_KEY);
    let addUser = {
      ...req.body,
      password: hash,
    };
    addUser = await prisma.user.create({ data: addUser });
    return res.status(201).json({ userData: addUser, token });
  } else {
    return res.status(400).send("User is Already Exists");
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (!checkEmail) {
    return res.status(401).json(new ApiError(401, "Invaild Email"));
  }

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });
  res.status(201).json(new ApiRespone(201, "", "Password is Reset"));
});
module.exports = {
  loginUser,
  forgetPassword,
  otpSend,
  registerUser,
  resetPassword,
};
