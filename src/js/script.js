const form = document.getElementById("atendimentoForm");
const tabela = document.getElementById("tabela").querySelector("tbody");
const baixarBtn = document.getElementById("baixarBtn");

let atendimentos = [];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let endereco = document.getElementById("endereco").value;

  let hoje = new Date();
  let data = hoje.toLocaleDateString("pt-BR");

  // Guardar atendimento
  let atendimento = { nome, cpf, endereco, data };
  atendimentos.push(atendimento);

  // Mostrar na tabela
  let row = tabela.insertRow();
  row.insertCell(0).textContent = nome;
  row.insertCell(1).textContent = cpf;
  row.insertCell(2).textContent = endereco;
  row.insertCell(3).textContent = data;

  form.reset();
});

baixarBtn.addEventListener("click", function() {
  if (atendimentos.length === 0) {
    alert("Nenhum atendimento registrado!");
    return;
  }

  let txt = `
+------------+-----------------+----------------------+------------+
|    Nome    |       CPF       |      Endereço        |    Data    |
+------------+-----------------+----------------------+------------+
`;

  atendimentos.forEach(a => {
    txt += `| ${a.nome.padEnd(10)} | ${a.cpf.padEnd(15)} | ${a.endereco.padEnd(20)} | ${a.data} |\n`;
  });

  txt += `+------------+-----------------+----------------------+------------+\n`;

  let blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "atendimentos_" + new Date().toLocaleDateString("pt-BR") + ".txt";
  link.click();
});
