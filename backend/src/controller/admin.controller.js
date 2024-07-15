const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiRespone");
const ApiError = require("../utils/ApiError");
const prisma = new PrismaClient();
const findCategoryTruth = async (category, req, res) => {
  const findTruth = await prisma.category.findMany({
    where: {
      categoryname: category,
    },
    include: {
      truths: true,
    },
  });

  if (findTruth.length === 0) {
    return res
      .status(404)
      .json(new ApiError(404, `Error in searching ${category} category`));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, findTruth, `Truths for ${category}`));
};

const getAdultsTruth = asyncHandler(async (req, res) => {
  await findCategoryTruth("Adults", req, res);
});
const getAllUsers = asyncHandler(async (req, res) => {
  const checkUser = await prisma.user.findMany();
  return res.status(200).json(new ApiResponse(200, checkUser, "Users Data"));
});
const getKidsTruth = asyncHandler(async (req, res) => {
  await findCategoryTruth("Kids", req, res);
});
const getTeensTruth = asyncHandler(async (req, res) => {
  await findCategoryTruth("Teens", req, res);
});
const getTruthController = async (req, res) => {
  const findTruth = await prisma.category.findMany({
    include: {
      truths: true,
    },
  });

  return res.status(200).json(new ApiResponse(200, findTruth, "GetAllTruths"));
};

const deleteTruthController = asyncHandler(async (req, res) => {
  const { id } = req.body;
  await prisma.truth.delete({
    where: { id },
  });
  res.status(200).send("Truth is Deleted");
});

const updateTruthController = asyncHandler(async (req, res) => {
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
});
const addTruthController = asyncHandler(async (req, res) => {
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
    res.status(401).json(new ApiError(401, `Truth is Already Exists`));
  }
});
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
