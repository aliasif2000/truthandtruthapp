const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../utils/asyncHandler");
const prisma = new PrismaClient();
const addTruth = asyncHandler(async (req, res) => {
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
});
const getCategory = asyncHandler(async (req, res) => {
  const { categoryname } = req.body;
  if (categoryname.trim() === "") {
    return res.status(404).json(404, "Category Name is Required");
  }
  const getCategoryTruth = await prisma.category.findMany({
    where: { categoryname },
    include: {
      truths: true,
    },
  });
  if (getCategoryTruth.length === 0) {
    return res.status(404).json(404, "Category Not Found");
  }
  res.status(200).send(getCategoryTruth);
});
module.exports = {
  addTruth,
  getCategory,
};
