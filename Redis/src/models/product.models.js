const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images_url: { 
        type:String,  required: true , default:"www.amazon.in"
    },
}, {
    versionKey: false,
    timestamp: true,
});

module.exports = model("product", productSchema);