var botao = document.getElementById("botao");
var limpar = document.getElementById("limpar");
var erros = document.getElementById("erros");
var tabela = document.getElementById("lista").getElementsByTagName("tbody")[0];

var linha = ""; 


async function mostrarTabela() {
    const { data, error } = await supabase.from("horarios").select("*");

    if (error) {
        console.error("Erro ao carregar:", error);
        return;
    }

    tabela.innerHTML = "";

    data.forEach(h => adicionaLinha(h));
}

function adicionaLinha(h) {
    var tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${h.hora}</td>
        <td>${h.domingo}</td>
        <td>${h.segunda}</td>
        <td>${h.terca}</td>
        <td>${h.quarta}</td>
        <td>${h.quinta}</td>
        <td>${h.sexta}</td>
        <td>${h.sabado}</td>
        <td><button class="alterarBtn">Alterar</button></td>
        <td><button class="excluirBtn">Excluir</button></td>
    `;

    tr.querySelector(".alterarBtn").onclick = () => alterar(h);
    tr.querySelector(".excluirBtn").onclick = () => excluir(h.id);

    tabela.appendChild(tr);
}


async function submeterForm() {

    var novo = {
        hora: document.getElementById("hora").value,
        domingo: document.getElementById("domingo").value,
        segunda: document.getElementById("segunda").value,
        terca: document.getElementById("terca").value,
        quarta: document.getElementById("quarta").value,
        quinta: document.getElementById("quinta").value,
        sexta: document.getElementById("sexta").value,
        sabado: document.getElementById("sabado").value
    };

    if (!novo.hora) {
        erros.innerHTML = "O campo 'Início do horário' deve ser informado.";
        return;
    }
    else if  (linha !== "") {
        await supabase.from("horarios").update(novo).eq("id", linha);
        linha = "";
    }
    else {
        await supabase.from("horarios").insert([novo]);
    }

    limparCampos();
    mostrarTabela();
}


// ALTERAR
function alterar(d) {
    linha = d.id;

    document.getElementById("hora").value = d.hora;
    document.getElementById("domingo").value = d.domingo;
    document.getElementById("segunda").value = d.segunda;
    document.getElementById("terca").value = d.terca;
    document.getElementById("quarta").value = d.quarta;
    document.getElementById("quinta").value = d.quinta;
    document.getElementById("sexta").value = d.sexta;
    document.getElementById("sabado").value = d.sabado;
}


// EXCLUIR
async function excluir(id) {
    if (!confirm("Confirma a exclusão?")) return;

    await supabase.from("horarios").delete().eq("id", id);

    mostrarTabela();
}


// LIMPAR CAMPOS
function limparCampos() {
    document.getElementById("form").reset();
    erros.innerHTML = "";
    linha = "";
}

 
// EVENTOS
botao.onclick = submeterForm;
limpar.onclick = limparCampos;


// INICIAR
mostrarTabela();
