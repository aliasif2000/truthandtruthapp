const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../../middleware/sendMail");
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
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (checkOtpUser) {
      await prisma.otp.update({
        where: { email: req.body.email },
        data: { otp },
      });
    } else {
      await prisma.otp.create({ data: { email: req.body.email, otp } });
    }
    sendMail(
      checkUser.username,
      checkUser.email,
      checkUser.token,
      otp,
      res,
      req
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
