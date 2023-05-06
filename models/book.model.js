const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  _id: {type:String,required:true},
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number,
});

const bookModel = mongoose.model("book", BookSchema);

module.exports = {
  bookModel,
};
