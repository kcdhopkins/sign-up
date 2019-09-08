
const postData = {
  method: 'GET'
}

function callback(text){

  let textArrayOfObjects = text.split("}");
  textArrayOfObjects.pop();
  let objectArray = textArrayOfObjects.map( value => `${value}}`);
  objectArray.forEach( (value, index) => createTable(JSON.parse(value), index+1) );
}

function createTable(userData, rowNumber){
    let el = document.getElementById('userDataTable');
    let row = el.insertRow(rowNumber);

    row.insertCell(0).innerHTML = userData['FirstName'];
    row.insertCell(1).innerHTML = userData['LastName'];
    row.insertCell(2).innerHTML = userData['Age'];
    row.insertCell(3).innerHTML = userData['Address'];
}

fetch('php/api.php', postData)
  .then( response => response.text())
  .then( text => callback(text));
