// Selecione o botão "LOG IN"
const btnLogin = document.querySelector('#btnlogin a');

// Adicione um evento de clique ao botão "LOG IN"
btnLogin.addEventListener('click', function(event) {
  event.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário

  // Selecione os campos de entrada do formulário
  const usernameOrEmail = document.querySelector('input[type="name"]').value;
  const password = document.querySelector('input[type="password"]').value;

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
  .then(response => response.json())
  .then(data => {
    console.log('Resposta do servidor:', data);
    localStorage.setItem('token', data.token);
    window.location.href = '/';
    // Faça algo com a resposta do servidor, como redirecionar o usuário para outra página
  })
  .catch(error => {
    console.error('Erro ao enviar a solicitação:', error);
  });
});