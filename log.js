const fs = require("fs");

class Log {
  static registrar(erro) {
    const mensagem = `[${new Date().toLocaleString()}] - ${erro}\n`;
    fs.appendFileSync("erros.log", mensagem, "utf8");
  }
}

module.exports = Log;
