const { connect } = require("./db");
const Log = require("./log");

class Evento {
  constructor(titulo, data, descricao, usuarioEmail) {
    this.titulo = titulo;
    this.data = data;
    this.descricao = descricao;
    this.usuarioEmail = usuarioEmail;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      await db.collection("eventos").insertOne({
        titulo: this.titulo,
        data: this.data,
        descricao: this.descricao,
        usuarioEmail: this.usuarioEmail,
      });
      client.close();
    } catch (error) {
      Log.registrar("Erro ao inserir evento: " + error.message);
    }
  }

  static async buscar(titulo) {
    try {
      const { db, client } = await connect();
      const evento = await db.collection("eventos").findOne({ titulo });
      client.close();
      return evento;
    } catch (error) {
      Log.registrar("Erro ao buscar evento: " + error.message);
      return null;
    }
  }

  static async atualizar(titulo, novosDados) {
    try {
      const { db, client } = await connect();
      await db.collection("eventos").updateOne(
        { titulo },
        { $set: novosDados }
      );
      client.close();
    } catch (error) {
      Log.registrar("Erro ao atualizar evento: " + error.message);
    }
  }

  static async deletar(titulo) {
    try {
      const { db, client } = await connect();
      await db.collection("eventos").deleteOne({ titulo });
      client.close();
    } catch (error) {
      Log.registrar("Erro ao deletar evento: " + error.message);
    }
  }
}

module.exports = Evento;
