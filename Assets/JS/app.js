/*
1. Seleção do elemento HTML

javascript
const resultado = document.querySelector("#resultado");

Seleciona o elemento com id="resultado" no HTML e armazena na variável resultado. 
É nesse elemento que os dados serão exibidos. 
*/

/*
2. Definição da URL da API

javascriptconst api = "http://localhost:5600/"

Define o endereço base da API local (rodando na porta 5600). 
Usar uma variável facilita a manutenção — se a URL mudar, você altera só aqui.
*/

/*
3. Função loadData — Buscar os dados

javascript

const loadData = async () => {
    const res = await fetch(api + "clientes");
    const data = await res.json();
    return data;
};

Linha - O que faz

async - Declara a função como assíncrona, permitindo usar await dentro dela

fetch(api + "clientes") - Faz uma requisição HTTP GET para http://localhost:5600/clientes

await - Pausa a execução até a resposta chegar

res.json() - Converte a resposta de JSON para um objeto/array JavaScript

return data - Retorna os dados para quem chamar a função
*/

/*
4. Função showData — Exibir os dados

javascriptconst showData = async () => {
    const getAllClientes = await loadData();

Chama loadData() e espera os dados chegarem .getAllClientes será um array de objetos, cada um representando um cliente.
*/

/*
5. Chamada inicial

javascript

showData()
Executa a função assim que o script carrega, disparando todo o fluxo.
*/

/*
Inserção no DOM

javascript

resultado.innerHTML = showClientes;
Insere todo o HTML gerado dentro do elemento #resultado na página.
*/

/*
Fluxo completo resumido
showData() é chamada
    └── loadData() faz GET em /clientes
        └── Retorna array de clientes
    └── .map() transforma cada cliente em HTML
    └── .join("") une tudo em uma string
    └── innerHTML exibe na página
*/

/*
Geração do HTML com .map()

javascript
const showClientes = getAllClientes.map((cliente) => {
    return `<div class="row">...</div>`;
}).join("");

Parte - O que faz.

map() - Itera sobre cada cliente do array e transforma em uma string HTML

Template literals ` ` - Permite inserir variáveis diretamente no HTML com ${}

cliente.nome, cliente.email... - Acessa as propriedades de cada objeto cliente

.join("") - Une todos os HTMLs gerados em uma única string (sem separadores)
*/

const resultado = document.querySelector("#resultado");
const btnSave = document.querySelector("#btnSave")
const btnOpenModal = document.querySelector("#btnOpenModal");
const btnAtualizar = document.querySelector("btnAtualizar")
const btnCancelar = document.querySelector("#btnCancelar");
const modalFormCadastro = document.querySelector("#modalFormCadastro");
const InputName = document.querySelector('input[id="nome"]');
const InputEmail = document.querySelector('input[id="email"]');
const InputTelefone = document.querySelector('input[id="telefone"]');
const InputCidade = document.querySelector('input[id="cidade"]');
const InputEstado = document.querySelector('input[id="estado"]');
const message = document.querySelector("#message")

const api = "http://localhost:5600/"

const loadData = async () => {
    /* res - response: resposta */
    const res = await fetch(api + "clientes");
    const data = await res.json();

    return data;
};

const showData = async () => {
    const getAllClientes = await loadData();
    const showClientes = getAllClientes.map(
        (cliente) => {
            
            const dataFormatada = new Date(
                cliente.data_cadastro,
            ).toLocaleDateString("pt-BR");

            return `
            <div class="row">
                <div class="col">${cliente.nome}</div>
                <div class="col">${cliente.email}</div>
                <div class="col">${cliente.telefone}</div>
                <div class="col">${cliente.cidade}</div>
                <div class="col">${cliente.estado}</div>
                <div class="col">${dataFormatada}</div>
                    <div>
                    <button>Editar</button>
                    <button>Deletar</button>
                </div>
            </div>        
            `;
            
        }
    ).join("");

    resultado.innerHTML = showClientes;
};

btnSave.addEventListener
("click", async (e) => 
    {
    e.preventDefault();

    const clienteData = 
    {
        nome: InputName.value,
        email: InputEmail.value,
        telefone: InputTelefone.value,
        cidade: InputCidade.value,
        estado: InputEstado.value,
    };
    // console.log(clienteData);

    const result = await fetch(api + "clientes", 
        {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteData),
        }
    )

    const res = await result.json();
    // console.log(res);
    message.innerHTML = `<div>${res.message}</div>`

    InputName.value = "";
    InputEmail.value = "";
    InputTelefone.value = "";
    InputCidade.value = "";
    InputEstado.value = "";

    
    setTimeout(() => {
        modalFormCadastro.classList.add("hide-modal");
        modalFormCadastro.classList.remove("show-modal");    
    }, 3000)
    

    }
);

btnOpenModal.addEventListener("click", () => {
    modalFormCadastro.classList.remove("hide-modal");
    modalFormCadastro.classList.add("show-modal");
});

btnCancelar.addEventListener("click", async (e) => {
    e.preventDefault();
    modalFormCadastro.classList.add("hide-modal");
    modalFormCadastro.classList.remove("show-modal");
});

showData()