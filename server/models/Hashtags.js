const mongoose = require("mongoose");

const HashtagsSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "must provide category"],
        },
        content: {
            type: Array,
            default: []
        }
    }
);

module.exports = mongoose.model("Hashtags", HashtagsSchema);