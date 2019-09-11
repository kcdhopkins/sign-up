export default class PreloadTableDataController {

   constructor(){
     this.preloadedData = {};
     const callback = (text) => this.preloadedData.visitorData = text;
     fetch('php/api.php', { method: 'GET' })
       .then( response => response.text())
       .then( text => callback(text));
   }

   createTable(){
     let visitorObjArray = JSON.parse(this.preloadedData.visitorData);
     visitorObjArray.forEach( (visitorObj, index) => {
     let el = document.getElementById('userDataTable');
     let row = el.insertRow(index + 1);

     row.insertCell(0).innerHTML = visitorObj['Name'];
     row.insertCell(1).innerHTML = visitorObj['Email'];
     row.insertCell(2).innerHTML = visitorObj['LeftComment'];
    });
   }

   refresh(){
     this.createTable();
   }
}
