const { model, Schema } = require('mongoose');

const seatSchema = new Schema({
    show_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'show',
        required: true,
    },

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("seat", seatSchema);