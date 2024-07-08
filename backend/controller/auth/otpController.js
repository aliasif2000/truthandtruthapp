const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = otpController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error checking OTP:", error);
    return res.status(500).send("Internal Server Error");
  }
};
