const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = resetController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!checkEmail) {
      return res.status(401).send("Invalid Email");
    }

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });
    res.status(201).send("Password is Reset");
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Failed to reset password.");
  }
};
