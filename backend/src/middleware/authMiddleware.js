const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const publicKey = process.env.JWT_PUBLIC_KEY;
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
  return undefined;
};

module.exports = { checkAuth };
