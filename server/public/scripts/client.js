console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  
} // end getKoalas


function addKoala(event) {
  event.preventDefault();

  console.log("Submit button clicked.");
  let koala = {};
  koala.name = document.getElementById("nameIn").value;
  koala.age = document.getElementById("ageIn").value;
  koala.gender = document.getElementById("genderIn").value;
  koala.readyForTransfer = document.getElementById("readyForTransferIn").value;
  koala.notes = document.getElementById("notesIn").value;
  saveKoala(koala);
}

function clearForm(){
  document.getElementById('nameIn').value = '';
  document.getElementById('ageIn').value = '';
  document.getElementById('genderIn').value = '';
  document.getElementById('readyForTransferIn').value = '';
  document.getElementById('notesIn').value = '';
}

// function saveKoala(event){
//   //event.preventDefault();
//   console.log( 'in saveKoala' );
//   // axios call to server to get koalas
//   //made this an object to create request body
//   let koalaObject ={
//     name: document.querySelector('#nameIn').value,
//     age: document.querySelector('#ageIn').value,
//     gender: document.querySelector('#genderIn').value,
//     readyForTransfer: document.querySelector('#readyForTransferIn').value,
//     notes: document.querySelector('#notesIn').value
//   }
//   console.log(koalaObject);
//   //send the new koala data to the server
//   axios.post('/koalas', koalaObject).then((response) => {
//     clearForm();
//     getKoalas();
// }).catch((error) => {
//     console.log('Error', error);
//     alert('Something went wrong');
// });
 
// }

function saveKoala(koalaAdded) {
const koalaToAdd= {
  name: document.getElementById("nameIn").value,
  age: document.getElementById("ageIn").value,
  gender: document.getElementById("genderIn").value,
  readyForTransfer: document.getElementById("readyForTransferIn").value,
  notes: document.getElementById("notesIn").value
}

  axios({
    method: "POST",
    url: "/koalas",
    data: koalaToAdd,
  })
    .then(function (response) {
      console.log("saveKoala()", response.data);
      getKoalas();
      clearForm();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add koala at this time. Please try again later.");
    });
}

function koalaReadyForTransfer(event) {

  console.log('incoming event.target', event.target)
  console.log('Getting dataset from component', event.target.closest("tr").dataset.id)

  // Retrieving data that has been stored on an element
  let koalaId = event.target.closest("tr").dataset.id

  axios.put(`/koalas/${koalaId}`)
      .then((response) => {
          getKoalas();
      })
      .catch((error) => {
          console.log('Error', error);
          alert('Something went wrong');
      });
}

getKoalas();
saveKoala()
