const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    _id: {type:String,required:true},
    user : { type: String, ref: 'User' },
    books : [{ type: String, ref: 'Book' }],
    totalAmount: Number
});

const orderModel = mongoose.model("order", OrderSchema);

module.exports = {
    orderModel,
};
