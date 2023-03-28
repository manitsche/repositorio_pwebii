// Preencher o formulário com os dados de retorno da API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("siafi").value = endereco.siafi;
} 

// Verifica se o que foi digitado pelo usuário é somente números
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

// Verifica se o CEP possui tamanho 8 e só possui números
function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
}

// Função para pesquisar o CEP via API
async function pesquisarCEP() {

    const cep = document.getElementById("cep").value.replace("-", "");
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        console.log(endereco);

        if (endereco.hasOwnProperty("erro")) {
            document.getElementById("endereco").value = "CEP não encontrado!";

        } else {
            preencherFormulario(endereco);
        }
        
        preencherFormulario(endereco);
    } else {
        // Se o CEP estiver incorreto, ou preenchido de forma errada, os campos relacionados ao endereço serão
        // limpos, e serão exibidas mensagens de erro nos campos de CEP e endereço
        LimpaCampos(endereco);
        document.getElementById("endereco").value = "CEP incorreto";
        document.getElementById("cep").value = "Erro";
    }
}

// Evento que pesquisa o CEP quando o foco é tirado do campo CEP
document.getElementById("cep").addEventListener("focusout", pesquisarCEP);

// Limpa os campos relacionados ao endereço
function LimpaCampos(endereco) {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ibge").value = "";
    document.getElementById("ddd").value = "";
    document.getElementById("siafi").value = "";
}   

// Limpa todos os campos, ao clicar no botão limpar
document.getElementById("btnLimpar").addEventListener("click", (e) => {
    LimpaCampos(endereco);
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
})

// Se o campo CEP estiver preenchido, sempre que o botão salvar for clicado, será exibido um alert, que contem
// todas as informações que retornam da API 
document.getElementById("btnSalvar").addEventListener("click", (e) => {
    if (document.getElementById("cep").value != "") {
        alert(document.getElementById("endereco").value + "\n" +
        document.getElementById("bairro").value + "\n" +
        document.getElementById("cidade").value + "\n"  +
        document.getElementById("estado").value + "\n"  +
        document.getElementById("ibge").value + "\n"  +
        document.getElementById("ddd").value + "\n"  +
        document.getElementById("siafi").value);
    } else {
        // Se o campo CEP não estiver preenchido, será exibido um alert, para reforçar o preenchimento do campo
        alert("Não há informações para serem exibidas. Preencha o campo CEP!")
    }
})