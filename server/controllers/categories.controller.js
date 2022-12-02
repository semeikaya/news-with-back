const Category = require("../models/Category.model");

module.exports.categoryContoller = {
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      res.json(error);
    }
  },
  // addCategory: async (req, res) => {
  //   try {
  //     const { name } = req.body;
  //     const categories = await Category.create({ name });
  //     res.json(categories);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },
};
