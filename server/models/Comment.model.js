const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  nameUser: { type: String, required: true },
  userID: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  newsID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "News",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
