if (!token) {
   window.location.href = '/login';
}
  fetch('https://api-all-for-cycling.onrender.com/auth', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }).then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            console.log(data.message);
          })
              //var token = localStorage.getItem("token");
              fetch('https://api-all-for-cycling.onrender.com/item/byUser',{
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
                    <div class="col-md-3 py-3 py-md-0">
                      <div class="card" style="margin-top: 30px;">
                          <a href="/More?imagem=${item.foto}&nome=${item.nome}&valor=${item.valor}&categoria=${item.categoria}&tipo=${item.tipo}&descricao=${item.descricao}&anunciante=${item.userName}&telefone=${item.userNumber}&cidade=${item.userCity}&UF=${item.userUF}">
                            <img id = "prod-img" src="https://api-all-for-cycling.onrender.com/imagens/${item.foto}" alt="">
                          </a>
                          <div class="card-body">
                            <h3 class="text-center">${item.nome}</h3>
                            <p class="text-center">${item.tipo}</p>
                            <h2>R$${item.valor}<span><a href="/EditItem?imagem=${item.foto}&nome=${item.nome}&valor=${item.valor}&categoria=${item.categoria}&tipo=${item.tipo}&descricao=${item.descricao}&anunciante=${item.userName}&telefone=${item.userNumber}&cidade=${item.userCity}&UF=${item.userUF}&id=${item.id}"><i id="edit" class="fa-solid fa-pen-to-square"></i></a>
                            <a href="#" class="delete-button" data-id="${item.id}"><i class="fa-solid fa-trash"></i></a></span></h2>
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
      function delItem(id) {
        fetch(`https://api-all-for-cycling.onrender.com/item/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token
          },
        })
        .then(response => {
          if (response.ok) {
            // o item foi excluído com sucesso
            console.log(`Item ${id} excluído com sucesso`);
            // atualize a página para refletir as alterações
            window.location.reload();
          } else {
            // ocorreu um erro ao excluir o item
            console.error(`Erro ao excluir item ${id}: ${response.statusText}`);
          }
        })
        .catch(error => {
          // ocorreu um erro na solicitação
          console.error(`Erro ao excluir item ${id}: ${error}`);
        });
      }
      
      setTimeout(function(){
        
        const deleteButtons = document.querySelectorAll('.delete-button');
        //console.log(deleteButtons[0].dataset.id);
        deleteButtons.forEach(button => {
          button.addEventListener('click', event => {
            const itemId = button.dataset.id;
            //console.log(itemId);
            delItem(itemId);
          });
        });
      }, 4000)

 