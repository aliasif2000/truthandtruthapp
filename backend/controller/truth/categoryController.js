const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryController = async (req, res) => {
  try {
    const { categoryname } = req.body;
    const getCategoryTruth = await prisma.category.findMany({
      where: { categoryname },
      include: {
        truths: true,
      },
    });
    res.status(200).send(getCategoryTruth);
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = categoryController;
