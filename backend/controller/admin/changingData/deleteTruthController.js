const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteTruthController = async (req, res) => {
  try {
    const { id } = req.body;
    const checkCategory = await prisma.truth.delete({
      where: { id },
    });
    res.status(200).send("Truth is Deleted");
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = deleteTruthController;
