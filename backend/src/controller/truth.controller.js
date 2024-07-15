const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const addTruth = async (req, res) => {
  try {
    const { categoryname, truth } = req.body;

    let category = await prisma.category.findFirst({
      where: { categoryname },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          categoryname,
        },
      });
    }
    const existingTruth = await prisma.truth.findFirst({
      where: {
        question: truth,
        categoryId: category.id,
      },
    });
    if (!existingTruth) {
      const newTruth = await prisma.truth.create({
        data: {
          question: truth,
          categoryId: category.id,
        },
      });
      res.status(201).json({ category, truth: newTruth });
    } else {
      res.status(401).send("Truth Already Exists");
    }
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getCategory = async (req, res) => {
  try {
    const { categoryname } = req.body;
    if (!categoryname) {
      return res.status(404).send("Category name not found");
    }
    const getCategoryTruth = await prisma.category.findMany({
      where: { categoryname },
      include: {
        truths: true,
      },
    });
    if (getCategoryTruth.length === 0) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send(getCategoryTruth);
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  addTruth,
  getCategory,
};
