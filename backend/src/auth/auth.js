const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token não enviado" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; //decodificando o token e atribuindo a requisição para que não seja preciso realizar isso novamente dentro dos tratamentos futuros
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
