class SubmitFormController {

  constructor(){
    this.name = document.getElementById('name').value;
    this.email = document.getElementById('email').value;
    this.comment = document.getElementById('comment').value;
  }

  submitForm(){
    if(!this.name || !this.email){
      if(!this.name && !this.email){
        alert('Please Enter your Name and Email');
      } else if(!this.name){
        alert('Please Enter your Name');
      } else if (!this.email){
        alert('Please Enter your email');
      }
    } else {
      this.submit(this.name, this.email, this.comment);
    }
   }

   submit(name, email, comment){
       let visitorData = {};
       visitorData.name = name;
       visitorData.email = email;
       visitorData.comment = comment;

       fetch('php/api.php', {method:'POST', body: JSON.stringify(visitorData)})
       .then( response => response.text())
       .then( text => alert(text));
     }
}

export default SubmitFormController;
