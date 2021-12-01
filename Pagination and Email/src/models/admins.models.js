const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,

    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("admin", adminSchema);

