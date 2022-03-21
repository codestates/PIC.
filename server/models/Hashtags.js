const mongoose = require("mongoose");

const HashtagsSchema = new mongoose.Schema(
  {
    분위기: {
        type: Array
    },
    주제: {
        type: Array
    },
    날씨: {
        type: Array
    },
    시간: {
        type: Array
    },
    지역: {
        type: Array
    }
  }
);

module.exports = mongoose.model("Hashtags", HashtagsSchema);