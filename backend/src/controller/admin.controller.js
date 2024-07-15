const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAdultsTruth = async (req, res) => {
  try {
    const findTruth = await prisma.category.findMany({
      where: {
        categoryname: "Adults",
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
const getAllUsers = async (req, res) => {
  try {
    const checkUser = await prisma.user.findMany();
    return res.status(200).send(checkUser);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
};
const getKidsTruth = async (req, res) => {
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
const getTeensTruth = async (req, res) => {
  try {
    const findTruth = await prisma.category.findMany({
      where: {
        categoryname: "Teens",
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
const getTruthController = async (req, res) => {
  try {
    const findTruth = await prisma.category.findMany({
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

const deleteTruthController = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.truth.delete({
      where: { id },
    });
    res.status(200).send("Truth is Deleted");
  } catch (error) {
    console.error("Error in addTruthController:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateTruthController = async (req, res) => {
  try {
    console.log(req.body)
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
const addTruthController = async (req, res) => {
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
module.exports = {
  addTruthController,
  deleteTruthController,
  updateTruthController,
  deleteTruthController,
  getAdultsTruth,
  getAllUsers,
  getKidsTruth,
  getTeensTruth,
  getTruthController,
};
