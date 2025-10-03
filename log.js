const fs = require("fs");

class Log {
  static registrar(erro) {
    const mensagem = `[${new Date().toISOString()}] - ${erro}\n`;
    fs.appendFileSync("erros.log", mensagem);
  }
}

module.exports = Log;
