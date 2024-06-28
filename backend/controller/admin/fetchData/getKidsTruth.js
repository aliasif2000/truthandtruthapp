const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = getKidsTruth = async (req, res) => {
  try {
    const findTruth = await prisma.category.findMany({
      where: {
        categoryname: "Kids",
      },
      include: {
        truths: true,
      },
    });
    return res.status(200).send(findTruth);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
