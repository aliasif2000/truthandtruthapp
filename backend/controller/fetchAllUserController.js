const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = fetchAllUserController = async (req, res) => {
  try {
    const getData = await prisma.user.findMany();
    res.send(getData);
  } catch (error) {
    console.error("Error in FetchAllUser:", error);
    return res.status(500).send("Internal Server Error");
  }
};
