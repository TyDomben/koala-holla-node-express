console.log( 'js' );

/**
 * DOM ELEMENTS
 */
let koalaTBody = document.getElementById('viewKoalas');

function getKoalas(){
  // console.log( 'in getKoalas' );
  // axios call to server to get koalas

  axios({
    method: "GET",
    url: "/koalas"
  })
  .then((response) => {
    // console.log(response.data);
    // send in the array of objects
    appendsKoalasToTable(response.data);
    // appendsKoalasToTable(koalaArray);
  })
  .catch((error) => {
    console.log("whoops, there be an error in here!");
    console.error(error);
  })
  
} // end getKoalas



function addKoala(event) {
  event.preventDefault();

  // console.log("Submit button clicked.");
  let koala = {};
  koala.name = document.getElementById("nameIn").value;
  koala.age = parseInt(document.getElementById("ageIn").value);
  koala.gender = document.getElementById("genderIn").value;
  koala.ready_to_transfer = document.getElementById("Yes").checked,
  koala.notes = document.getElementById("notesIn").value;
  console.log("koala:", koala);
  saveKoala(koala);
}

function clearForm(){
  document.getElementById('nameIn').value = '';
  document.getElementById('ageIn').value = '';
  document.getElementById('genderIn').value = '';
  document.getElementById('No').checked = true;
  document.getElementById('notesIn').value = '';
}

function saveKoala(koalaAdded) {
console.log('We are checking what the inputs are', koalaAdded);

  axios({
    method: "POST",
    url: "/koalas",
    data: koalaAdded,
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

  axios({
    method: "DELETE",
    url: `/koalas/${id}`
  })
  .then((response) => {
    console.log("response:", response.data);
    // refresh the table
    getKoalas();
  })
  .catch((error) => {
    console.log("whoops, there be an error in here!");
    console.error(error);
  })
}

function appendsKoalasToTable(arrayOfKoalas) {
  // console.log("made it into the appendsKoalasToTable - function!");
  // console.log("our koalas:");
  // console.table(arrayOfKoalas);

  // reset inner html of the table body
  koalaTBody.innerHTML = "";

  for (let koala of arrayOfKoalas){
    // console.log("name:", koala.name, "age:", koala.age, "gender:", koala.gender, "readyForTransfer:", koala.ready_to_transfer, "notes:", koala.notes );
    
    koalaTBody.innerHTML +=
      `
      <tr data-id="${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td>${koala.ready_to_transfer ? '' : '<button onclick="koalaReadyForTransfer(event)">Ready For Transfer</button>'}</td>
      <td><button onclick="deleteKoala(event)">Delete</button></td>
      </tr>    
      `;
    
  }
}

getKoalas();
// saveKoala();
