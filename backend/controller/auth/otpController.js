const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = otpController = async (req, res) => {
  try {
    const checkOtp = await prisma.otp.findFirst({
      where: {
        email: req.user,
        otp: req.body.otp,
      },
    });
    if (!checkOtp) {
      return res.status(401).send("Invalid Otp");
    }
    return res.status(201).send("Otp is Valid");
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
