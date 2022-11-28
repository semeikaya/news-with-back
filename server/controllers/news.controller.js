const News = require("../models/News.model");

module.exports.newsController = {
  getNews: async (req, res) => {
    try {
      const news = await News.find();
      return res.json(news);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getNewsById: async (req, res) => {
    try {
      const news = await News.findById(req.params.id);
      return res.json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  getNewsByCategoryId: async (req, res) => {
    try {
      const news = await News.find({ categoryID: req.params.id });
      return res.json(news);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  addNews: async (req, res) => {
    const imageURL = 'http://localhost:4040/images/' + req.file.originalname;
    console.log(req.file);
    const { title, text, commentsID, categoryID } = req.body;
    try {
      const news = await News.create({
        title,
        text,
        imageURL,
        commentsID,
        categoryID,
      });
      res.json(news);
    } catch (error) {
      res.json(error);
    }
  },
};
