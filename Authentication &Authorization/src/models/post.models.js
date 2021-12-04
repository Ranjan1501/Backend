const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports= model("post",postSchema);