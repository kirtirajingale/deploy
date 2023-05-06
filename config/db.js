const mongoose = require("mongoose");
require("dotenv").config();
const DataBaseURL = process.env.Mongo_Url;

const connection = mongoose.connect(DataBaseURL);

module.exports = {
  connection,
};
