
window.onload = ()=>{

  function callback(text){
    visitorObjArray = JSON.parse(text);
    visitorObjArray.forEach( (visitorObj, index) => createTable(visitorObj, index + 1) );
  }

  function createTable(userData, rowNumber){
      let el = document.getElementById('userDataTable');
      let row = el.insertRow(rowNumber);

      row.insertCell(0).innerHTML = userData['Name'];
      row.insertCell(1).innerHTML = userData['Email'];
      row.insertCell(2).innerHTML = userData['LeftComment'];
  }

  const getDataCall = { method: 'GET' };

  fetch('php/api.php', getDataCall)
    .then( response => response.text())
    .then( text => callback(text));
}

// SubmitForm ------------>

function submitForm(){

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  if(!name || !email){
    if(!name && !email){
      alert('Please Enter your Name and Email');
    } else if(!name){
      alert('Please Enter your Name');
    } else if (!email){
      alert('Please Enter your email');
    }
  } else {
    submit(name, email, comment);
  }

  function submit(name, email, comment){
    let visitorData = {};
    visitorData.name = name;
    visitorData.email = email;
    visitorData.comment = comment;


    fetch('php/api.php', {method:'POST', body: JSON.stringify(visitorData)})
    .then( response => response.text())
    .then( text => alert(text));
  }
}
