const { connect } = require("./db");
const Log = require("./log");

class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      await db.collection("usuarios").insertOne({
        nome: this.nome,
        email: this.email,
      });
      client.close();
    } catch (error) {
      Log.registrar("Erro ao inserir usuário: " + error.message);
    }
  }

  static async buscar(email) {
    try {
      const { db, client } = await connect();
      const usuario = await db.collection("usuarios").findOne({ email });
      client.close();
      return usuario;
    } catch (error) {
      Log.registrar("Erro ao buscar usuário: " + error.message);
      return null;
    }
  }

  static async atualizar(email, novosDados) {
    try {
      const { db, client } = await connect();
      await db.collection("usuarios").updateOne(
        { email },
        { $set: novosDados }
      );
      client.close();
    } catch (error) {
      Log.registrar("Erro ao atualizar usuário: " + error.message);
    }
  }

  static async deletar(email) {
    try {
      const { db, client } = await connect();
      await db.collection("usuarios").deleteOne({ email });
      client.close();
    } catch (error) {
      Log.registrar("Erro ao deletar usuário: " + error.message);
    }
  }
}

module.exports = Usuario;
