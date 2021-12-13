const { model, Schema } = require('mongoose');

const showSchema = new Schema({
    timing: { type: String, required: true },
    total_seats: { type: Number, required: true },
    movie_id: 
        {
            type: Schema.Types.ObjectId,
            ref: 'movie',
            required: true,
        },

    screen_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'screen',
        required: true,
    },

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("show", showSchema);