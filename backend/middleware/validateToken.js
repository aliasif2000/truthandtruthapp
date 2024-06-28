const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }
  try {
    const checkToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = checkToken;
    next();
  } catch (error) {
    return res.status(401).send("Access Denied: Invalid token");
  }
};

module.exports = validateToken;
