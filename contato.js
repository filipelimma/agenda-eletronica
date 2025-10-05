const { connect } = require("./db");
const Log = require("./log");

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
      Log.registrar("Erro ao inserir contato: " + error.message);
    }
  }

  static async buscar(nome) {
    try {
      const { db, client } = await connect();
      const contato = await db.collection("contatos").findOne({ nome });
      client.close();
      return contato;
    } catch (error) {
      Log.registrar("Erro ao buscar contato: " + error.message);
      return null;
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
      Log.registrar("Erro ao atualizar contato: " + error.message);
    }
  }

  static async deletar(nome) {
    try {
      const { db, client } = await connect();
      await db.collection("contatos").deleteOne({ nome });
      client.close();
    } catch (error) {
      Log.registrar("Erro ao deletar contato: " + error.message);
    }
  }
}

module.exports = Contato;
