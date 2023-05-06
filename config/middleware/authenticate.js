const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    let tokenId = req?.headers?.authorization;

    if (!tokenId) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    token = req.headers.authorization.split(" ")[1];

    const validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!validToken) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    req.body.userId = validToken.userId;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Somthing went wrong", err: err.message });
  }
};

module.exports = {
  auth,
};
