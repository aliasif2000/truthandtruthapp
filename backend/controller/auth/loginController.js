const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign(checkUser.email, process.env.SECRET_KEY);
    return res.status(201).json({ userData: checkUser,token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
