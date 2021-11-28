const mongoose = require('mongoose');

//evaluation Mongoose Schema

const evaluationSchema = new mongoose.Schema({
    date_of_evaluation: { type: Date, required: true },
    instructor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    topic_ids: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true,
    },
],
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("evaluation", evaluationSchema);