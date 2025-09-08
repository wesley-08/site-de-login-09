document.getElementById("atendimentoForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let endereco = document.getElementById("endereco").value;

  // Data automática
  let hoje = new Date();
  let data = hoje.toLocaleDateString("pt-BR");

  // Criar tabela em texto
  let tabela = `
+------------+-----------------+----------------------+------------+
|    Nome    |       CPF       |      Endereço        |    Data    |
+------------+-----------------+----------------------+------------+
| ${nome.padEnd(10)} | ${cpf.padEnd(15)} | ${endereco.padEnd(20)} | ${data} |
+------------+-----------------+----------------------+------------+
`;

  // Criar arquivo txt
  let blob = new Blob([tabela], { type: "text/plain;charset=utf-8" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "atendimento.txt";
  link.click();
});
