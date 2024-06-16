// var botao = document.getElementById("botaoLogin");
// botao.addEventListener("click", confereUsuario);

function confereUsuario(event) {
    event.preventDefault(); 

    let login = localStorage.getItem('login');
    let pass = localStorage.getItem('senha');

    var usuario = document.getElementById("idLogin");
    var senha = document.getElementById("idSenha");
   
    // localStorage.setItem('login', usuario);
    // localStorage.setItem('senha', senha);

    if (login==usuario.value && pass==senha.value) {
       window.location.href = "./index.html";  
       var mensagem = document.querySelector('#troca');
       mensagem.innerHTML = "Bruno"
 
    } else {
        alert("USUÁRIO E SENHA INVÁLIDOS");
    }
}

