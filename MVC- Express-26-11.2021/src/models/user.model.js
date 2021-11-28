const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    date_of_birth: { type: Date, required: true },

}, {
    versionKey: false,
    timestamps: true,
});

// create a model from the schema
module.exports = mongoose.model('user', userSchema);