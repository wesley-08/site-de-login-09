let dados = [];

const form = document.getElementById("atendimentoForm");
const tabela = document.getElementById("planilha").getElementsByTagName('tbody')[0];
const botaoExcel = document.getElementById("baixarExcel");

// Adicionar dados
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const local = document.getElementById("local").value;
    const data = new Date().toLocaleDateString('pt-BR');

    const registro = {data, nome, cpf, local};
    dados.push(registro);

    // Adiciona na tabela HTML
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).innerText = data;
    novaLinha.insertCell(1).innerText = nome;
    novaLinha.insertCell(2).innerText = cpf;
    novaLinha.insertCell(3).innerText = local;

    form.reset();
});

// Baixar Excel usando SheetJS
botaoExcel.addEventListener("click", function() {
    if(dados.length === 0){
        alert("Nenhum dado para baixar!");
        return;
    }

    // Criar worksheet a partir do array de dados
    const ws = XLSX.utils.json_to_sheet(dados);

    // Criar workbook e adicionar worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Atendimento");

    // Salvar arquivo
    XLSX.writeFile(wb, "atendimento.xlsx");
});
