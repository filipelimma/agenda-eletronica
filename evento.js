const { connect } = require("./db");

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
      console.error("Erro ao inserir evento:", error);
    }
  }

  static async buscar(titulo) {
    try {
      const { db, client } = await connect();
      const evento = await db.collection("eventos").findOne({ titulo });
      client.close();
      return evento;
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
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
      console.error("Erro ao atualizar evento:", error);
    }
  }

  static async deletar(titulo) {
    try {
      const { db, client } = await connect();
      await db.collection("eventos").deleteOne({ titulo });
      client.close();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  }
}

module.exports = Evento;
