const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = getAllUsers = async (req, res) => {
  try {
    const checkUser = await prisma.user.findMany();
    return res.status(200).send(checkUser);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
