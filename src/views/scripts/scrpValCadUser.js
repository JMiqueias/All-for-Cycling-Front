const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


function cadastrar() {
  nameValidate();
  emailValidate();
  telValidate();
  cidadeValidate();
  estadoValidate();
  mainPasswValidate();

  let isValid = true;
  for (let i = 0; i < spans.length; i++) {
    let span = spans[i].style.display
    console.log(span)
    if ( span == 'block') {
      
      isValid = false;
      break;
    }
  }
console.log(isValid);
  // se todos os dados estiverem corretos

  if (isValid) {

  // Enviar uma requisição fetch se todos os dados estiverem corretos
  const data = {
    name: campos[0].value,
    email: campos[1].value,
    number: campos[2].value,
    city: campos[3].value,
    state: campos[4].value,
    password: campos[5].value
  };

  console.log(data);

  fetch("https://api-all-for-cycling.onrender.com/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res => {
    if (res.status === 201) {
      res.json().then(data => {
        console.log(data.message);
      })
      
      //window.location.href = '/';

    } else if (res.status === 400 || 500) {
      res.json().then(data => {
        console.log(data.message);
      })
     
      spans[8].style.display = 'block';
      //window.location.href = '/CadUser';
    }
  })
    .catch((error) => {
      alert(error.message);
    });
  } 
}







function setError(index){
  spans[index].style.display = 'block';
}

function removError(index){
  spans[index].style.display = 'none';
}

function nameValidate(){
  if (campos[0].value.length < 5){
    setError(0);
  }
  else{
    removError(0);
  }
}

function emailValidate(){
  if (emailRegex.test(campos[2].value)){
    removError(2);
  }
  else{
    setError(2);
  }
}

function telValidate(){
  if (campos[1].value.length < 11){
    setError(1);
  }
  else{
    removError(1);
  }
}

function cidadeValidate(){
  if (campos[3].value.length < 3){
    setError(3);
  }
  else{
    removError(3);
  }
}

function estadoValidate(){
  if (campos[4].value.length === 2){
    removError(4);
  }
  else{
    setError(4);
  }
}

function mainPasswValidate(){
  if (campos[5].value.length < 8){
    setError(5);
  }
  else{
    removError(5);
  }
}