const Express = require("express");
const MidlewareJson = Express();

const Json = MidlewareJson.use((req, res, next) => {
  Express.json()(req, res, (err) => {
    if (err) {
      return next(err); // Se houver um erro ao fazer o parsing JSON
    }
    Express.urlencoded({ extended: true })(req, res, (err) => {
      if (err) {
        return next(err); // Se houver um erro ao fazer o parsing URL-encoded
      }
      next(); // Chama o próximo middleware após o parsing bem-sucedido
    });
  });
});

module.exports = Json;
