
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const image = document.getElementById('myFile');
const divId = document.querySelector("[idprod]");
const id = divId.getAttribute("idprod");


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
} else if (res.status === 400 || 500) {
  res.json().then(data => {
    console.log(data.message);
  })
  window.location.href = '/login';
 
}

});

function cadastrar(){
  nameValidate();
  cateValidade();
  condValidade();
  descValidate();
  valValidate();
  //imgValidate();

  let isValid = true;
  for (let i = 0; i < spans.length; i++) {
    let span = spans[i].style.display
    console.log(span)
    if ( span == 'block') {
      
      isValid = false;
      break;
    }
  }
console.log(isValid)
  if(isValid){
  var token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('nome', campos[0].value);
  formData.append('categoria', campos[1].value);
  formData.append('tipo', campos[2].value);
  formData.append('descricao', campos[3].value);
  formData.append('valor', campos[4].value);
  if (image.files[0]){
    formData.append('file', image.files[0]);
  }
  fetch('https://api-all-for-cycling.onrender.com/item/' + id, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    }).then(res => {
          if (res.status === 201) {
            res.json().then(data => {
              console.log(data.message);
            })
            window.location.href = '/produtos';
    
          } else if (res.status === 400 || 500) {
            res.json().then(data => {
              console.log(data.message);
            })
            spans[6].style.display = 'block';
            //window.location.href = '/CadUser';
          }
        
        })
    
  } 
};

function setError(index){
  //campos[index].style.border = '2px solid #e63636';
  spans[index].style.display = 'block';
}

function removError(index){
  //campos[index].style.border = '';
  spans[index].style.display = 'none';
}

function nameValidate(){
  if (campos[0].value.length < 3){
    setError(0);
  }
  else{
    removError(0);
  }
}

function cateValidade(){
  console.log(campos[1].value)
  if (campos[1].value == ""){
    setError(1);
  }
  else{
    removError(1);
  }
}
function condValidade(){
  console.log(campos[2].value)
  if (campos[2].value == ""){
    setError(2);
  }
  else{
    removError(2);
  }
}

function descValidate(){
  if (campos[3].value.length < 10){
    setError(3);
  }
  else{
    removError(3);
  }
}

function valValidate(){
  console.log(campos[4].value)
  if (campos[4].value == "" || parseFloat(campos[4].value) < 0){
    setError(4);
  }
  else{
    removError(4);
  }
}

function imgValidate(){
  console.log(campos[5].value)
  if (campos[5].value == ""){
    setError(5);
  }
  else{
    removError(5);
  }
}

