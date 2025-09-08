let dados = [];

const form = document.getElementById("atendimentoForm");
const tabela = document.getElementById("planilha").getElementsByTagName('tbody')[0];
const botaoCsv = document.getElementById("baixarCsv");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const local = document.getElementById("local").value;
    const data = new Date().toLocaleDateString('pt-BR');

    // Adicionar dados no array
    const registro = {data, nome, cpf, local};
    dados.push(registro);

    // Adicionar linha na tabela
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).innerText = data;
    novaLinha.insertCell(1).innerText = nome;
    novaLinha.insertCell(2).innerText = cpf;
    novaLinha.insertCell(3).innerText = local;

    form.reset();
});

// Função para baixar CSV
botaoCsv.addEventListener("click", function() {
    if(dados.length === 0){
        alert("Nenhum dado para baixar!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Data,Nome,CPF,Local\n";
    dados.forEach(item => {
        csvContent += `${item.data},${item.nome},${item.cpf},${item.local}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "atendimento.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
