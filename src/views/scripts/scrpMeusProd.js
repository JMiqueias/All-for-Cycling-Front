const welcome = document.getElementById('welcome');
if (!token) {
   window.location.href = '/login';
}
  fetch('https://api-centraldosom.onrender.com/auth', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }).then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            console.log(data.message);
            welcome.innerText = "Bem vindo(a) " + data.user;
          })
              //var token = localStorage.getItem("token");
              fetch('https://api-centraldosom.onrender.com/item/byUser',{
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + token
                },
              }).then(response => response.json())
                .then(data => {
                  // seleciona o contêiner na página onde os itens serão exibidos
                  const container = document.getElementById('itens');
                  
                  // itera sobre os dados e adiciona o conteúdo gerado para cada item
                  data.produtos.forEach(item => {
                    // gera o conteúdo HTML usando o código acima e os dados do item
                    const itemHtml  = `
                      <div class="item">
                        <a href="/More?imagem=${item.foto}&nome=${item.nome}&valor=${item.valor}&categoria=${item.categoria}&tipo=${item.tipo}&descricao=${item.descricao}&anunciante=${item.userName}&telefone=${item.userNumber}&cidade=${item.userCity}&UF=${item.userUF}">
                          <img src="https://api-centraldosom.onrender.com/imagens/${item.foto}" alt="">
                        </a>
                        <p>${item.nome}</p>
                        <h5>R$${item.valor}</h5>
                        <h3>${item.tipo}</h3>
                        <a href="CadItem?imagem=${item.foto}&nome=${item.nome}&valor=${item.valor}&categoria=${item.categoria}&tipo=${item.tipo}&descricao=${item.descricao}&anunciante=${item.userName}&telefone=${item.userNumber}&cidade=${item.userCity}&UF=${item.userUF}">
                        <button type="button" class="button green" id="edit-${item.nome}">editar</button>
                        <a/>
                        <a href="/">
                        <button type="button" class="button red" id="delete-${item.nome}">excluir</button>
                        <a/>
                        <div class="modal" id="modal">
                        <div class="modal-content">
                          <span class="close-button" onclick="closeModal()">
                            &times;
                          </span>
                        
                          <h1 id="modal-message"></h1>
                          <button type="button" class="button sim" id="edit-${item.nome}">Sim</button>
                          <button type="button" class="button nao" id="delete-${item.nome}">Não</button>
                        
                        </div>
                      </div>
                      </div>
                    `;
                    // adiciona o conteúdo gerado ao contêiner na página
                    container.insertAdjacentHTML('beforeend', itemHtml);
                  });
                })
                .catch(error => {
                  console.error('Ocorreu um erro:', error);
                });
  
        } else if (res.status === 400 || 500) {
          res.json().then(data => {
            console.log(data.message);
          })
          window.location.href = '/login';
         
        }
       
      });

    function showModal(message, action,modal,css) {
      currentAction = action;
      var element = document.getElementById(modal);
      document.getElementById("modal-message").innerHTML = message;
      element.classList.add(css);
    }

    function showModal(message, action,modal,css) {
      currentAction = action;
      var element = document.getElementById(modal);
      document.getElementById("modal-message").innerHTML = message;
      element.classList.add(css);
      
    }

  
    function closeModal() {
      var element = document.getElementById("modal");
      element.classList.remove("show-modal");
    }
  
    document.addEventListener("DOMContentLoaded", function() {
      const editButtons = document.querySelectorAll(".button.green");
      const deleteButtons = document.querySelectorAll(".button.red");
      const confirmButton = document.querySelector(".button.sim");
      const negButton = document.querySelector(".button.nao");
  
      editButtons.forEach(function(editButton) {
        editButton.addEventListener("click", function(event) {
          showModal("Deseja mesmo editar?", "edit","modal","show-modal");
          console.log(`Editar item: ${event.target.id}`);
        });
      });
  
      deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener("click", function(event) {
          showModal("Deseja mesmo excluir?", "delete","modal","show-modal");
          console.log(`Excluir item: ${event.target.id}`);
        });
      });
   
      confirmButton.addEventListener("click", function() {
        switch (currentAction) {
          case "edit":
            // Código para editar item
            console.log("Editando item");
            
             //window.location.href = '/CadItem';
             //window.location.href = '/CadItem?imagem=' + imagem + '&nome=' + nome + '&valor=' + valor + '&categoria=' + categoria + '&tipo=' + tipo + '&descricao=' + descricao + '&anunciante=' + anunciante + '&telefone=' + telefone;
             
            break;
          case "delete":
            // Código para excluir item
            console.log("Excluindo item");
            break;
          default:
            console.log("Nenhuma ação selecionada");
        }
  
        closeModal();
      });

      negButton.addEventListener("click", function() {
  
        closeModal();
      });
    });
  