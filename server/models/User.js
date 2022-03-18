const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      trim: true,
      unique: [true, "the nickname already exist"],
      required: [true, "must provide nickname"],
    },
    email: {
      type: String,
      unique: [true, "the email already exist"],
      required: [true, "must provide email"],
    },
    password: {
      type: String,
      required: [true, "must provide password"],
    },
    image: {
      type: String,
      default: "https://i.ibb.co/tMVFYdr/no-image-709ea11ceed07452132945912fd5c436755e3eddd89d92eed4fd66128e8dcf7a.png"
    },
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    likes: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);