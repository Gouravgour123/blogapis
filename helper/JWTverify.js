
const jwt = require("jsonwebtoken")
require("dotenv").config();

const verifyToken = async (req, res, next) => {

      let token = req.header("Authorization");
     
      let tokenV = token.split(" ")[1];
      var decoded = jwt.verify(tokenV, process.env.JWTKEY);
      req.user = decoded;
      next();
  };

module.exports = {verifyToken}