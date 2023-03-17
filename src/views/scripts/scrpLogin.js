// Selecione o botão "LOG IN"
const btnLogin = document.querySelector('#btnlogin a');

// Adicione um evento de clique ao botão "LOG IN"
btnLogin.addEventListener('click', function(event) {
  event.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário

  // Selecione os campos de entrada do formulário
  const usernameOrEmail = document.querySelector('input[type="name"]').value;
  const password = document.querySelector('input[type="password"]').value;
  const spans = document.querySelectorAll('.span-required');

  // Crie um objeto JavaScript com os valores dos campos
  const data = {
    email: usernameOrEmail,
    password: password
  };
  //console.log(data);
  // Envie a solicitação HTTP POST usando o método fetch()
  fetch('https://api-all-for-cycling.onrender.com/auth', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    console.log(res.status);
      if (res.status === 200) {
        res.json().then(data => {
          localStorage.setItem('token', data.token);
        });
        message = ("Sucesso!");
        type = "success";
        console.log(message);
        window.location.href = '/';

      } else if (res.status === 400 || 500) {
        message = ("Usuário ou senha incorretos!");
        type = "danger"
        console.log(message);
        spans[0].style.display = 'block';
        //window.location.href = '/CadUser';
      }
  })
  .catch(error => {
    console.error('Erro ao enviar a solicitação:', error);
  });
});