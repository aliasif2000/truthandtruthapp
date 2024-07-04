const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateRandomToken = async (req, res, next) => {
  const token = req.header("random-token");
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }
  try {
    const checkToken = await prisma.user.findFirst({
      where: { token },
    });
    req.user = checkToken.email;
    next();
  } catch (error) {
    return res.status(401).send("Access Denied: Invalid token");
  }
};

module.exports = validateRandomToken;
