console.log( 'js' );

/**
 * DOM ELEMENTS
 */
let koalaTBody = document.getElementById('viewKoalas');

/**
 * DUMMY STATE
 */
let koalaArray = [{id: 1, name: 'Scotty', gender: 'M', age: 4, readyForTransfer: true, notes: 'Born in Guatemala.'},
{id: 2, name: 'Jean', gender: 'F', age: 5, readyForTransfer: true, notes: 'Allergic to lots of lava.'},
{id: 3, name: 'Ororo', gender: 'F', age: 7, readyForTransfer: false, notes: 'Loves listening to Paula (Abdul).'},
{id: 4, name: 'K\'Leaf',	gender: 'NB', age: 15, readyForTransfer: 'N', notes: 'Never refuses a treat.'},
{id: 5, name: 'Charlie',	gender: 'M', age: 9, readyForTransfer: true, notes: 'Favorite band is Nirvana.'},
{id: 6, name: 'Betsy', gender: 'F', age: 4, readyForTransfer: true, notes: 'Has a pet iguana.'}];

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas

  // axios({
  //   method: "GET",
  //   url: "/koalas"
  // })
  // .then((response) => {
  //   console.log(response.data);
    // send in the array of objects
    // appendsKoalasToTable(response.data);
    appendsKoalasToTable(koalaArray);
  // })
  // .catch((error) => {
  //   console.log("whoops, there be an error in here!");
  //   console.error(error);
  // })
  
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

function deleteKoala(event) {
  const id = event.target.closest("tr").dataset.id;
  console.log("id of row to delete:", id);

  // axios({
  //   method: "DELETE",
  //   url: `/delete/${id}`
  // })
  // .then((response) => {
  //   console.log("response:", response.data);
  //   // refresh the table
  //   getKoalas();
  // })
  // .catch((error) => {
  //   console.log("whoops, there be an error in here!");
  //   console.error(error);
  // })
  let foundIndex;
  for (let i = 0; i < koalaArray.length; i++) {
    if (koalaArray[i].id == id){
      foundIndex = i;
    }
  }

  koalaArray.splice(foundIndex, 1);
  // refresh the table
  getKoalas();
}

function appendsKoalasToTable(arrayOfKoalas) {
  console.log("made it into the appendsKoalasToTable - function!");
  console.log("our koalas:");
  console.table(arrayOfKoalas);

  // reset inner html of the table body
  koalaTBody.innerHTML = "";

  for (let koala of arrayOfKoalas){
    console.log("name:", koala.name, "age:", koala.age, "gender:", koala.gender, "readyForTransfer:", koala.readyForTransfer, "notes:", koala.notes );
    
    koalaTBody.innerHTML +=
      `
      <tr data-id="${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.readyForTransfer}</td>
      <td>${koala.notes}</td>
      <td>${koala.readyForTransfer ? '' : '<button onclick="koalaReadyForTransfer(event)">Ready For Transfer</button>'}</td>
      <td><button onclick="deleteKoala(event)">Delete</button></td>
      </tr>    
      `;
    
  }
}

getKoalas();
// saveKoala();
