const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: {type:String,required:true},
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const userModel = mongoose.model("user", UserSchema);

module.exports = {
  userModel,
};
