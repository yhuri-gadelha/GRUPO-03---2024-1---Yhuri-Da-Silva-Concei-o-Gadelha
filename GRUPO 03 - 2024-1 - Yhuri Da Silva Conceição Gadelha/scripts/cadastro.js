////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const celInput = document.getElementById('idCel');
    const telFixoInput = document.getElementById('idTelFixo');

    celInput.addEventListener('input', function() {
        const formattedValue = formatPhoneNumber(this.value, true);
        this.value = formattedValue;
    });

    telFixoInput.addEventListener('input', function() {
        const formattedValue = formatPhoneNumber(this.value, false);
        this.value = formattedValue;
    });

    function formatPhoneNumber(phoneNumber, isCelular) {
        const cleaned = phoneNumber.replace(/\D/g, '');

        if (isCelular) {
            return `(+55) ${cleaned.substring(2, 4)} ${cleaned.substring(4, 9)}-${cleaned.substring(9, 13)}`;
        } else {
            return `(+55) ${cleaned.substring(2, 4)} ${cleaned.substring(4, 8)}-${cleaned.substring(8, 12)}`;
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idCep').addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('idEstado').value = data.uf;
                        document.getElementById('idCidade').value = data.localidade;
                        document.getElementById('idBairro').value = data.bairro;
                        document.getElementById('idRua').value = data.logradouro;
                    } else {
                        alert('CEP não encontrado.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                    alert('Erro ao buscar o CEP. Tente novamente.');
                });
        } else {
            alert('CEP inválido. Deve conter 8 dígitos.');
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || 
        cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999") {
        return false;
    }

    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        return false;
    }

    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('idCpf');

    cpfInput.addEventListener('input', function() {
        cpfInput.value = formatarCPF(cpfInput.value);
    });

    document.querySelector('form').addEventListener('submit', cadastrarUsuario);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cadastrarUsuario(event) {
    event.preventDefault();
    var nome = document.getElementById("idNome");
    var datanascimento = document.getElementById("idDatanNascimento");
    var genero = document.getElementById("idGenero");
    var nomeMae = document.getElementById("idNomeMae");
    var cpf = document.getElementById("idCpf");
    var email = document.getElementById("idEmail");
    var cel = document.getElementById("idCel");
    var telFixo = document.getElementById("idTelFixo");
    var cep = document.getElementById("idCep");
    var estado = document.getElementById("idEstado");
    var cidade = document.getElementById("idCidade");
    var bairro = document.getElementById("idBairro");
    var rua = document.getElementById("idRua");
    var numero = document.getElementById("idNumero");
    var complemento = document.getElementById("idComplemento");
    var login = document.getElementById("idLogin");
    var senha = document.getElementById("idSenha");
    var confirmeSenha = document.getElementById("idConfirmeSenha");

    if (!validarCPF(cpf.value)) {
        alert('CPF inválido!');
        return;
    }

    if(nome.value!= "" && datanascimento.value!= ""
        && genero.value!= ""&& nomeMae.value!= ""
        && cpf.value!= "" && email.value!= "" 
        && cel.value!= "" && telFixo.value!= ""
        && cep.value!= "" && rua.value!= ""
        && numero.value!= "" && complemento.value!= ""
        && bairro.value!= "" && cidade.value!= ""
        && estado.value!= "" && confirmeSenha.value!= "" 
        && senha.value!= "" && login.value!= "") {
        localStorage.setItem("nome", nome.value);
        localStorage.setItem("datanascimento", datanascimento.value);
        localStorage.setItem("genero", genero.value);
        localStorage.setItem("nomeMae", nomeMae.value);
        localStorage.setItem("cpf", cpf.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("cel", cel.value);
        localStorage.setItem("telFixo", telFixo.value);
        localStorage.setItem("cep", cep.value);
        localStorage.setItem("rua", rua.value);        
        localStorage.setItem("numero", numero.value);
        localStorage.setItem("complemento", complemento.value);
        localStorage.setItem("bairro", bairro.value);
        localStorage.setItem("cidade", cidade.value);
        localStorage.setItem("estado", estado.value)
        localStorage.setItem("login", login.value);
        localStorage.setItem("senha", senha.value);
        localStorage.setItem("confirmeSenha", confirmeSenha.value);

        alert("Usuario Cadastrado!!")
        window.location = "../html/login.html"
    } else {
        alert("Preencha os Campos Corretamente!!")
    }
}
