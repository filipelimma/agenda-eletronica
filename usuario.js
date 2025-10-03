const { connect } = require("./db");

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
      console.error("Erro ao inserir usuário:", error);
    }
  }

  static async buscar(email) {
    try {
      const { db, client } = await connect();
      const usuario = await db.collection("usuarios").findOne({ email });
      client.close();
      return usuario;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
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
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  static async deletar(email) {
    try {
      const { db, client } = await connect();
      await db.collection("usuarios").deleteOne({ email });
      client.close();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }
}

module.exports = Usuario;
