const { connect } = require("./db");

class Contato {
  constructor(nome, telefone, email) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      await db.collection("contatos").insertOne({
        nome: this.nome,
        telefone: this.telefone,
        email: this.email,
      });
      client.close();
    } catch (error) {
      console.error("Erro ao inserir contato:", error);
    }
  }

  static async buscar(nome) {
    try {
      const { db, client } = await connect();
      const contato = await db.collection("contatos").findOne({ nome });
      client.close();
      return contato;
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
    }
  }

  static async atualizar(nome, novosDados) {
    try {
      const { db, client } = await connect();
      await db.collection("contatos").updateOne(
        { nome },
        { $set: novosDados }
      );
      client.close();
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  }

  static async deletar(nome) {
    try {
      const { db, client } = await connect();
      await db.collection("contatos").deleteOne({ nome });
      client.close();
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  }
}

module.exports = Contato;
