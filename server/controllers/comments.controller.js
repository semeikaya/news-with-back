const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

module.exports.commentController = {
  addComment: async (req, res) => {
    const { text, newsID } = req.body;
    const userID = req.user.id;
    const nameUser = req.user.name;
    try {
      const comment = await Comment.create({
        nameUser,
        text,
        userID,
        newsID,
      });
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  },
  removeComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.userID.toString() === req.user.id) {
        const user = await Comment.findByIdAndRemove(req.params.id);
        return res.json(req.params.id);
      }
      return res.json({ error: "Отказано в доступе" });
    } catch (e) {
      return res.status(401).json("Ошибка " + e.toString());
    }
  },

  getComment: async (req, res) => {
    try {
      const comments = await Comment.find({ newsID: req.params.id });
      return res.json(comments);
    } catch (error) {
      res.json(error);
    }
  },
};
