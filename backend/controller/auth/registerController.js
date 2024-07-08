const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = registerController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send("Internal Server Error");
  }
};
