const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/User");

const SECRET = "segredo_super_secreto"; // colocar em .env depois

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token, role: user.role });
};

exports.verifyToken = (req, res) => {
  res.json({ message: "Token válido", user: req.user });
};
