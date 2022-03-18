const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      trim: true,
      required: [true, "must provide description"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);