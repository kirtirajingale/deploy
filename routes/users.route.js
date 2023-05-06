const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");
const Router = require("express");

const useRouter = Router();

useRouter.post("/api/register", async (req, res) => {
  try {
    const payload = req.body;
    const useradd = await User.findOne({ email: payload.email });
    if (useradd) {
      return res.send({ msg: "Please Login" });
    } 
    else {
      const hashPass = await bcrypt.hashSync(payload.password, 8);
      payload.password = hashPass;

      const UserNew = new User(payload);
      await UserNew.save();

      return res.json({ msg: "User Registered", useradd: UserNew });
    }
  } catch (err) {
    res.send({ msg: err.message });
  }
});


useRouter.post("/api/login", async (res, req) => {
  try {
    const payload = req.body;
    const key = process.env.JWT_SECRET_KEY;
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.send({ msg: "Please SignUp First" });
    }

    const checkPass = await bcrypt.compareSync(payload.password, user.password);

    if (checkPass) {
      const tokenId = await jwt.sign(
        { email: user.email, userId: user._id },
        key
      );
      res.json({ msg: "Login successful", tokenId });
    } else {
      res.json({ msg: "Invalid Credential" });
    }
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = {
  useRouter,
};
