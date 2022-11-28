const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

module.exports.commentController = {
  addComment: async (req, res) => {
    try {
      const { text, newsID } = req.body;
      const comment = Comment.create({
        nameUser: req.user.name,
        text,
        userID: req.user.id,
        newsID,
      });
      res.json(comment);
    } catch (error) {
      res.json(error)
    }
  },
};
