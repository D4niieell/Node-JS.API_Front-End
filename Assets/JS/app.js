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