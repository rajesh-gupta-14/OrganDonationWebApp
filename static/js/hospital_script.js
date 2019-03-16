//Action items screen

//Switching to appointment approval tabs on clicking the card
var appointmentLink = document.getElementById("appointDiv");
appointmentLink.onclick = function(){
      $('[href="#appointment_approvals"]').tab('show');
}
//Switching to donation approval tabs on clicking the card
var donationLink = document.getElementById("donationsDiv");
donationLink.onclick = function(){
      $('[href="#donation_approvals"]').tab('show');
}


//Update profile screen
var saveButton = document.getElementById("updateSave");
var clearButton = document.getElementById("updateClear");

//Function to alert the user when the profile is updated
function saveUpdatedDetails(){
   Swal.fire({
      type: 'success',
      title: 'Done',
      text: 'Your changes have been saved!',
    });
}

function clearUpdatedDetails(){
document.getElementById("hospitalUpdateForm").reset();
}

saveButton.addEventListener("click", saveUpdatedDetails);
clearButton.addEventListener("click", clearUpdatedDetails);

//Appointment approval page
var appointmentTable = document.getElementById("appointmentTable"),rIndex;
var isAppointmentRowSelected = false;
var donorName;

//Row selection for appointment approval table
for(var i = 0; i < appointmentTable.rows.length; i++){
    appointmentTable.rows[i].onclick=function(){
        //removing the highlighting colour for the unselected rows
        if(this.rowIndex !== 0){
            console.log("r index next:",+rIndex);
           if(typeof rIndex !== "undefined"){
            appointmentTable.rows[rIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
        rIndex = this.rowIndex;
        this.classList.toggle("blue");
        console.log("row:",+rIndex);
        donorName = this.cells[2].innerHTML;
        console.log("donor: "+donorName);
        this.cells[0].childNodes[0].checked = true;
        }

    };
}
var appointmentDetailsBtn = document.getElementById("appointmentDtls");
var appointmentAcceptBtn = document.getElementById("appointmentApprv");
var appointmentDenyBtn = document.getElementById("appointmentDeny");


//Function to check if a record is selected in the appointment approval table
function isRowSelectedForAppointment(){
 var radiosDonation = document.getElementsByClassName("appointRadios");
 for(var i = 0; i<radiosDonation.length;i++){
     if(radiosDonation[i].type === "radio" && radiosDonation[i].checked){
           return true;
     }

 }
   return false;
}

//Function to alert the user when appointment is approved
function acceptAppointment(){

   if(!isRowSelectedForAppointment()){
           Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please select an appointment to approve!',
      footer: 'Tip: Click on one of the rows from the table to proceed'
    });
   }
   else{
      Swal.fire({
      type: 'success',
      title: 'Done',
      text: donorName+ "\'s appointment has been approved!",
      footer: 'Next step: The donation can now be accepted or denied under the pending donations approval tab.'
    });
      appointmentTable.deleteRow(rIndex);
      rIndex = undefined;
   }
}

//Function to alert the user when appointment is denied
function denyAppointment(){

   if(!isRowSelectedForAppointment()){
           Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please select an appointment to deny!',
      footer: 'Tip: Click on one of the rows from the table to proceed'
    });
   }
   else{
      Swal.fire("Done",donorName+ "\'s appointment has been denied!","success");
      appointmentTable.deleteRow(rIndex);
      rIndex = undefined;
   }
}

//Function to alert the user regarding details
function detailsOfAppointment(){
Swal.fire({
      type: 'info',
      title: 'In progress',
      text: 'The details of the appointment will be updated soon!',
      footer: 'Thanks for your patience.'
    });
}

appointmentAcceptBtn.addEventListener("click", acceptAppointment);
appointmentDetailsBtn.addEventListener("click", detailsOfAppointment);
appointmentDenyBtn.addEventListener("click", denyAppointment);

//Donation approval page

var donationTable = document.getElementById("donationTable"),dIndex;
var donorNameforDonation;

//Row selection for donation approval table
for(var i = 0; i < donationTable.rows.length; i++){
    donationTable.rows[i].onclick=function(){
        if(this.rowIndex !== 0){
            //removing the highlighting colour for the unselected rows
            if(typeof dIndex !== "undefined"){
            donationTable.rows[dIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
        dIndex = this.rowIndex;
        this.classList.toggle("blue");
        console.log(dIndex);
        donorNameforDonation = this.cells[2].innerHTML;
        console.log("donor: "+donorNameforDonation);
        this.cells[0].childNodes[0].checked = true;
    }
    };
}
var donationDetailsBtn = document.getElementById("donationDtls");
var donationAcceptBtn = document.getElementById("donationApprv");
var donationDenyBtn = document.getElementById("donationDeny");

//Function to check if a record is selected in the donation table
function isDonationRowSelected(){
 var radiosDonation = document.getElementsByClassName("selectionRadios");
 for(var i = 0; i<radiosDonation.length;i++){
     if(radiosDonation[i].type === "radio" && radiosDonation[i].checked){
           return true;
     }

 }
   return false;
}

//Function to alert the user when donation is approved
function acceptDonation(){
   if(!isDonationRowSelected()){
           Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please select a donation!',
      footer: 'Tip: Click on one of the rows from the table to proceed'
    });
   }
   else{
      Swal.fire({
      type: 'success',
      title: 'Done',
      text: donorNameforDonation+ "\'s donation has been approved!",
      footer: 'Next step: The donation can now be searched under the search donations tab.'
    });
      donationTable.deleteRow(dIndex);
      dIndex = undefined;
   }
}

function denyDonation(){

   if(!isDonationRowSelected()){
           Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please select a donation to deny!',
      footer: 'Tip: Click on one of the rows from the table to proceed'
    });
   }
   else{
      Swal.fire("Done",donorNameforDonation+ "\'s donation has been denied!","success");
      donationTable.deleteRow(dIndex);
      dIndex = undefined;
   }
}


function detailsOfDonation(){
Swal.fire({
      type: 'info',
      title: 'In progress',
      text: 'The details of the donation will be updated soon!',
      footer: 'Thanks for your patience.'
    });
}

donationDetailsBtn.addEventListener("click", detailsOfDonation);
donationAcceptBtn.addEventListener("click", acceptDonation);
donationDenyBtn.addEventListener("click", denyDonation);

//Donation search page
var donationSearchTable = document.getElementById("donationSearchTable"),sIndex;
var searchBtn = document.getElementById("search_btn");
var userInput = document.getElementById("searchInput");
var donorToContact;

//Function to dynamically add search results as table rows
function performSearch(){
    var xhttp = new XMLHttpRequest();
    var searchInput = document.getElementById("searchInput").value;
    document.getElementById("searchInput").value = '';
    var dummyIndex;
    var donors ;
    if(checkSearchInput(searchInput)){
        //donors= createGETRequest("http://localhost:8000/hospitals/search-donations/");
        var xhttp = new XMLHttpRequest();
        var getObject;
        const url = "http://localhost:8000/hospitals/search-donations";
        var searchParam = "?" + "keyword=" +searchInput;
        console.log(url+searchParam);
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("Number of donations: ",getObject.length);
                 if(getObject.length <= 0){
                     Swal.fire({
                        type: 'info',
                        title: 'No donations found',
                        text: 'Your search keyword has no donations associated with it.',
                      });
                 }
                 else{
                   displaySearchResults(getObject);
                 }
             }
        };
        xhttp.open("GET",url+searchParam, true);
        xhttp.send();
        }
    else{
      Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please enter a keyword to search',
      footer: 'Tip: Enter a keyword related to the donation'
    });
    }

}

function displaySearchResults(donors){
        var searchTable = document.getElementById("donationSearchTable");
        var tableBody = document.getElementById("searchTableBody");
        var rowLength = tableBody.getElementsByTagName("tr").length;

        //Removing previous search results
        if(rowLength > 0){
          while(tableBody.hasChildNodes()){
           tableBody.removeChild(tableBody.lastChild);
          }
        }

        for(var i = 0; i < donors.length ; i++){
            var row = document.createElement("tr");
            row.className = "selectable_row";
            var td0 = row.insertCell();
            var td1 = row.insertCell();
            var td2 = row.insertCell();
            var td3 = row.insertCell();
            var td4 = row.insertCell();
            var radioBtn = document.createElement("input");
            radioBtn.setAttribute("type","radio");
            radioBtn.setAttribute("name","radioID");
            radioBtn.className = "searchRadios";
            td0.appendChild(radioBtn);
            td1.appendChild(document.createTextNode(donors[i].Donation_ID));
            td2.appendChild(document.createTextNode(donors[i].Donor));
            td3.appendChild(document.createTextNode(donors[i].Organ));
            td4.appendChild(document.createTextNode(donors[i].Blood_Group));
            tableBody.appendChild(row);
            row.onclick = function(){
                //removing the highlighting colour for the unselected rows
                if(typeof dummyIndex !== "undefined"){
            donationSearchTable.rows[dummyIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
              this.classList.toggle("blue");
              dummyIndex = this.rowIndex;
              donorToContact = this.cells[2].innerHTML;
              this.cells[0].childNodes[0].checked = true;
            }
        }


}

//Function to check the length of user input in the search box
function checkSearchInput(searchInput){
         console.log("length" +searchInput.length);
         if(searchInput.length <= 0){
             return false;
         }
         return true;
}

//Function for handling enter key press on the search box
function performSearchWhenEnter(event){
   if(event.keyCode == "13"){
       performSearch();
   }
}

searchBtn.addEventListener("click", performSearch);
userInput.addEventListener("keypress", performSearchWhenEnter);

var searchDetailsBtn = document.getElementById("searchDtls");
var searchEmail = document.getElementById("searchEmail");

//Function to check if the table row is selcted
function isSearchRowSelected(){
 var radiosDonation = document.getElementsByClassName("searchRadios");
 for(var i = 0; i<radiosDonation.length;i++){
     if(radiosDonation[i].type === "radio" && radiosDonation[i].checked){
           return true;
     }

 }
   return false;
}

//Function to alert the user regarding donation details
function searchDetails(){
Swal.fire({
      type: 'info',
      title: 'In progress',
      text: 'The details of the donor will be updated soon!',
      footer: 'Thanks for your patience.'
    });
}

//Function to alert the user when email button is clicked
function emailDonor(){
    if(isSearchRowSelected()){
    Swal.fire({
          type: 'success',
          title: 'Done',
          text: 'An email has been sent to ' +donorToContact,
          });
    }
    else{
    Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please select a donation!',
          footer: 'Tip: Click on one of the rows from the table to proceed'
        });
    }

}

searchDetailsBtn.addEventListener("click", searchDetails);
searchEmail.addEventListener("click", emailDonor);


//Change password and Log out

var logOut = document.getElementById("logOut");
//var changePassword = document.getElementById("changePassword");

//Function to alert the user when logout option is selected
function performLogOut(){
Swal.fire({
      type: 'info',
      title: 'In progress',
      text: 'The logout feature will be availabe soon!',
      footer: 'Thanks for your patience.'
    });
}

logOut.addEventListener("click", performLogOut);


//Rest API creation
function createGETRequest(url){
   var xhttp = new XMLHttpRequest();
   var getObject;
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             getObject = JSON.parse(this.responseText);
             console.log("Number of donations: ",getObject.length);
         }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    return getObject;
}

function createPOSTRequest(url){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "Your Rest URL Here", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}
