const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.userController = {
  signUp: async (req, res) => {
    const { name, login, password } = req.body;
    const result = await User.findOne({ login });
    if (result) {
      return res.json({ error: "Пользователь с таким именем уже существует" });
    }
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SEC));
    const user = await User.create({ name, login, password: hash });
    return res.json(user);
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
