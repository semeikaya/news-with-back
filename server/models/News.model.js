const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    commentsID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
    imageURL: { type: String },
    categoryID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
