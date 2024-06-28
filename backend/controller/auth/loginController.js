const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = loginController = async (req, res) => {
  try {
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
    return res.status(201).json({ userData: checkUser });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
