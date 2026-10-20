// 1. SELECIONAR OS elementos do DOM
const campo = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa() {
    const texto = campo.value.trim();

    // validação: não deixa adicionar tarefa vazia
    if (texto === "") {
        mensagem.textContent = "Escreva algo antes de adicionar.";
        campo.focus();
        return;
    }
    mensagem.textContent = "";

    // CRIAR elementos novos
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = texto; // textContent é seguro contra HTML malicioso

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remover";
    botaoRemover.type = "button"; // Corrigido: "button"

    // Montar a estrutura: <li><span>texto</span><button>Remover</button></li>
    li.appendChild(span);
    li.appendChild(botaoRemover); // Corrigido: botaoRemover
    lista.appendChild(li);

    // limpar o campo e voltar o foco para ele
    campo.value = "";
    campo.focus();
    atualizarContador(); // Corrigido nome da função
}

// 3. FUNÇÃO que atualiza o texto do contador
function atualizarContador() {
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length; // Corrigido para "concluida"

    if (total === 0) {
        contador.textContent = "Nenhuma tarefa ainda";
    } else {
        // Corrigido: Uso de crases `` e sintaxe \${} para as variáveis
        contador.textContent = `${feitas} de ${total} concluída(s).`;
    }
}

// 4. EVENTOS
// Clique no botão "adicionar"
botao.addEventListener("click", adicionarTarefa);

// Apertar Enter no campo também adiciona
campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegação de evento: um único "ouvinte" na lista
lista.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const li = alvo.closest("li");
    
    if (!li) return;

    if (alvo.classList.contains("remover")) { // Corrigido: classList
        li.remove(); // Corrigido: .remove() nativo do JS
    } else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida"); // Corrigido: classList e nome da classe igual ao do contador
    }
    
    atualizarContador();

})
// TEMA CLARO / ESCURO
const botaotema = document.getAnimations("temas")
const raíz = document.documentElement; // a tag <html>

function aplicartema(tema) {
    raíz.setAttribute("data-tema", tema);
    botaotema.textContent = tema === "escuro" ? "tema claro" : "tema escuro";
}

 // Ao abrir a página: usa o tema salvo  ou, se não houver, o do sistema
 const temaSalvo = localStorage.getItem("tema");
 const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
 aplicartema(temaSalvo || (sistemaEscuro ? "escuro" : "claro "));

 // Ao clicar: iverte o tema e salva a escolha
 botaotema.addEventListener("clicar", () => {
     const atul = raíz.getAttribute("data-tema");
     const novo = atual === "claro" ? "escuro";
     aplicartema(novo);
     localStorage.setItem("tema", novo);
 }):