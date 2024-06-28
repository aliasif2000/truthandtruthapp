const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateTruthController = async (req, res) => {
  try {
    const { id, question } = req.body;
    const checkCategory = await prisma.truth.update({
      where: { id },
      data: {
        question,
      },
    });
    res
      .status(200)
      .json({ message: "Truth is Update", updateTruth: checkCategory });
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = updateTruthController;
