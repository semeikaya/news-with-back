const News = require("../models/News.model");

module.exports.newsController = {
  getNews: async (req, res) => {
    try {
      const currentPage = req.params.id;
      const news = await News.find();
      const lastNewsIndex = currentPage * 3;
      const firstNewsIndex = lastNewsIndex - 3;
      const currentNews = news.slice(firstNewsIndex, lastNewsIndex);
      const pageNumbers = []
      for (let i = 1; i <= Math.ceil(news.length/3); i++){
        pageNumbers.push(i)
      }
      return res.json({currentNews, pageNumbers});
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
  getNewsBySearch: async (req, res) => {
    const id = req.params.id;
    try {
      const news = await News.find({
        title: new RegExp(`${id}`, "i"),
      });
      if (news.length !== 0) {
        return res.json(news);
      }
      return res.json({ error: "По вашему запросу ничего не найдено..." });
    } catch (error) {
      return res.json(error);
    }
  },
  autocompleteNews: async (req, res) => {
    const id = req.params.id;
    try {
      const news = await News.find({
        title: new RegExp(`${id}`, "i"),
      });
      if (news.length !== 0) {
        return res.json(news);
      }
      return res.json({ error: "По вашему запросу ничего не найдено..." });
    } catch (error) {
      return res.json(error);
    }
  },

  addNews: async (req, res) => {
    const imageURL = "http://localhost:4040/images/" + req.file.originalname;
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
