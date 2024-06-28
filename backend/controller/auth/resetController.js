const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = resetController = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.update({
      where: { email: req.user },
      data: {
        password: hashedPassword,
      },
    });
    res.status(201).send("Password is Reset");
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Failed to reset password.");
  }
};
