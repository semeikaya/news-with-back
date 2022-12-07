const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.userController = {
  signUp: async (req, res) => {
    try {
      const { name, login, password } = req.body;
      const result = await User.findOne({ login });

      if (!name) {
        return res.json({
          error: "Введите ваше имя",
        });
      }

      if (!login) {
        return res.json({
          error: "Придумайте логин",
        });
      }

      if (!password) {
        return res.json({
          error: "Придумайте пароль",
        });
      }

      if (result) {
        return res.json({
          error: "Пользователь с таким логином уже существует",
        });
      }
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SEC));
      const user = await User.create({ name, login, password: hash });

      const payload = {
        name: user.name,
        id: user._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      return res.json(token);
    } catch (error) {
      res.json(error);
    }
  },

  signIn: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if (login === "") {
      return res.status(401).json({ error: "Вы не ввели имя" });
    }
    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин" });
    }

    const valid = await bcrypt.compare(password, candidate.password);
    if (password === "") {
      return res.status(401).json({ error: "Вы не ввели пароль" });
    }
    if (!valid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    const payload = {
      name: candidate.name,
      id: candidate._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    return res.json(token);
  },
};
