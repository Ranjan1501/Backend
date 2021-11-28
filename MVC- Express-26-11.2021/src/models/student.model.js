const mongoose = require('mongoose');

// Student mongoose Schema

const studentSchema = new mongoose.Schema({
    roll_id: { type: Number, required: true,unique:true },
    current_batch: { type: String, required: true },
    user_id:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
        unique:true,
    },
},
    {
        versionKey: false,
        timestamps: true,
    });

module.exports = mongoose.model('student', studentSchema);