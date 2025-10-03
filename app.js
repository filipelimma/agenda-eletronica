const Usuario = require("./usuario");
const Evento = require("./evento");
const Contato = require("./contato");

async function main() {
  console.log("==== TESTANDO USUÁRIO ====");
  const user = new Usuario("Filipe", "filipe@example.com");

  // CREATE
  await user.inserir();
  console.log("Usuário inserido:", await Usuario.buscar("filipe@example.com"));

  // UPDATE
  await Usuario.atualizar("filipe@example.com", { nome: "Filipe Atualizado" });
  console.log("Usuário atualizado:", await Usuario.buscar("filipe@example.com"));

  // DELETE
  await Usuario.deletar("filipe@example.com");
  console.log("Usuário após deletar:", await Usuario.buscar("filipe@example.com"));

  console.log("\n==== TESTANDO EVENTO ====");
  const evento = new Evento(
    "Reunião",
    "2025-10-15",
    "Reunião com equipe",
    "filipe@example.com"
  );

  // CREATE
  await evento.inserir();
  console.log("Evento inserido:", await Evento.buscar("Reunião"));

  // UPDATE
  await Evento.atualizar("Reunião", { descricao: "Reunião adiada" });
  console.log("Evento atualizado:", await Evento.buscar("Reunião"));

  // DELETE
  await Evento.deletar("Reunião");
  console.log("Evento após deletar:", await Evento.buscar("Reunião"));

  console.log("\n==== TESTANDO CONTATO ====");
  const contato = new Contato("Larissa", "99999-9999", "larissa@example.com");

  // CREATE
  await contato.inserir();
  console.log("Contato inserido:", await Contato.buscar("Larissa"));

  // UPDATE
  await Contato.atualizar("Larissa", { telefone: "88888-8888" });
  console.log("Contato atualizado:", await Contato.buscar("Larissa"));

  // DELETE
  await Contato.deletar("Larissa");
  console.log("Contato após deletar:", await Contato.buscar("Larissa"));
}

main();
