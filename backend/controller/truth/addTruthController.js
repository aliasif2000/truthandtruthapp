const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkCategoryTruth = async (checkCategory, checkTruth, req, res) => {
  try {
    //if Category Exist Check the truth and add truth
    if (checkCategory) {
      checkTruths(checkTruth, checkCategory, req, res);
    }
    //if Category not Exist create the category and Check the truth and add truth
    else {
      const newCategory = await prisma.category.create({
        data: {
          categoryname: req.body.categoryname,
        },
      });

      checkTruths(checkTruth, newCategory, req, res);
    }
  } catch (error) {
    console.error("Error in checkCategoryTruth:", error);
    res.status(500).send("Internal Server Error");
  }
};

const checkTruths = async (checkTruth, addCategory, req, res) => {
  try {
    //if the truth not Exist add in truth Table
    if (checkTruth.length === 0) {
      const addTruth = await prisma.truth.create({
        data: {
          question: req.body.truth,
          categoryId: addCategory.id,
        },
      });
      res.status(201).json({ category: addCategory, truth: addTruth });
    }
    //if the truth Exist
    else {
      res.status(401).send("Truth Already Exists");
    }
  } catch (error) {
    console.error("Error in checkTruths:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addTruthController = async (req, res) => {
  try {
    const { categoryname } = req.body;
    //Check Category Exist
    const checkCategory = await prisma.category.findFirst({
      where: { categoryname },
    });
    //Check if truth Exist
    const checkTruth = await prisma.truth.findMany({
      where: {
        question: req.body.truth,
      },
    });
    //Create or Add Category and Truth
    checkCategoryTruth(checkCategory, checkTruth, req, res);
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = addTruthController;
