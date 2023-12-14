console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  
} // end getKoalas

function saveKoala(event){
  event.preventDefault();
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
  //made this an object to create request body
  let koalaObject ={
    name: document.querySelector('#nameIn').value,
    age: document.querySelector('#ageIn').value,
    gender: document.querySelector('#genderIn').value,
    readyForTransfer: document.querySelector('#readyForTransferIn').value,
    notes: document.querySelector('#notesIn').value
  }
  //send the new koala data to the server
  axios.post('/koalas', koalaObject).then((response) => {
    //clearForm();
    //getKoalas();
}).catch((error) => {
    console.log('Error', error);
    alert('Something went wrong');
});
 
}

getKoalas();
