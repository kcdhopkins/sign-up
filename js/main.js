import PreloadTableData from './controllers/PreloadTableDataController.js';
import SubmitForm from './controllers/submitFormController.js';

window.onload = function(){
  let preload = new PreloadTableData();
  let waiter = setInterval(()=>{
        if(preload.preloadedData.visitorData){
          clearInterval(waiter);
          preload.createTable();
        }
      });
}

let clicked = document.getElementById('submitButton');
    clicked.addEventListener('click', ()=>{
      let submission = new SubmitForm();
      submission.submitForm();
});

let refresh = document.getElementById('refresh');
    refresh.addEventListener('click', ()=>{
      let refreshTable = new PreloadTableData();
      let waiter = setInterval(()=>{
            if(refreshTable.preloadedData.visitorData){
              clearInterval(waiter);
              refreshTable.createTable();
            }
      });
});
