const Usuario = require("./usuario");
const Evento = require("./evento");
const Contato = require("./contato");

async function main() {
  console.log("==== TESTANDO USUÁRIO ====");
  const user = new Usuario("Filipe", "filipe@example.com");

  await user.inserir();
  console.log(await Usuario.buscar("filipe@example.com"));
  await Usuario.atualizar("filipe@example.com", { nome: "Filipe Atualizado" });
  console.log(await Usuario.buscar("filipe@example.com"));
  await Usuario.deletar("filipe@example.com");
  console.log(await Usuario.buscar("filipe@example.com"));

  console.log("\n==== TESTANDO EVENTO ====");
  const evento = new Evento(
    "Reunião",
    "2025-10-15",
    "Reunião com equipe",
    "filipe@example.com"
  );

  await evento.inserir();
  console.log(await Evento.buscar("Reunião"));
  await Evento.atualizar("Reunião", { descricao: "Reunião adiada" });
  console.log(await Evento.buscar("Reunião"));
  await Evento.deletar("Reunião");
  console.log(await Evento.buscar("Reunião"));

  console.log("\n==== TESTANDO CONTATO ====");
  const contato = new Contato("Larissa", "99999-9999", "larissa@example.com");

  await contato.inserir();
  console.log(await Contato.buscar("Larissa"));
  await Contato.atualizar("Larissa", { telefone: "88888-8888" });
  console.log(await Contato.buscar("Larissa"));
  await Contato.deletar("Larissa");
  console.log(await Contato.buscar("Larissa"));
}

main();
