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
            td1.appendChild(document.createTextNode(donors[i].donation_id));
            td2.appendChild(document.createTextNode(donors[i].donor));
            td3.appendChild(document.createTextNode(donors[i].organ));
            td4.appendChild(document.createTextNode(donors[i].blood_group));
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

var xhttp = new XMLHttpRequest();
        var getObject;
        var donationId;
        var dummy;

        //Fetching the donation ID of the selected row
        var radiosDonation = document.getElementsByClassName("searchRadios");
        for(var i = 0; i<radiosDonation.length;i++){
         if(radiosDonation[i].type === "radio" && radiosDonation[i].checked){
               dummy = ++i;
         }
       }
        donationId = donationSearchTable.rows[dummy].cells[1].innerHTML;
        console.log("donId: " +donationId);
        const url = "http://localhost:8000/hospitals/search-donation-details";
        var searchParam = "?" + "donation_id=" +donationId;
        console.log(url+searchParam);
        var getObject;
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("name: " +getObject[0].user_name);
                 displaySearchDetailsResult(getObject);
         }
        }
        xhttp.open("GET",url+searchParam, true);
        xhttp.send();

}

function displaySearchDetailsResult(donationDetails){

var searchDiv = document.getElementById("search_donation");

var removeDiv = document.getElementById("details_of_donation");
if (removeDiv != null){
    removeDiv.parentNode.removeChild(removeDiv);
}
var donorDetailsDiv = document.createElement("div");
donorDetailsDiv.classList = "card";
donorDetailsDiv.classList = "top";
donorDetailsDiv.id = "details_of_donation";
var firstDivChild = document.createElement("div");
firstDivChild.className = "card-header";
firstDivChild.appendChild(document.createTextNode("Donor Details"));

var secondDivChild = document.createElement("div");
secondDivChild.className = "card-body";

//Donor details
var gridContainerDiv = document.createElement("div");
gridContainerDiv.className = "details-grid-container";

var gridItem1 = document.createElement("div");
gridItem1.className = ".details-grid-item";

var firstName = document.createElement("p");
firstName.className = "card-text";
firstName.appendChild(document.createTextNode("First Name: " +donationDetails[0].first_name));
gridItem1.appendChild(firstName);

var lastName = document.createElement("p");
lastName.className = "card-text";
lastName.appendChild(document.createTextNode("Last Name: " +donationDetails[0].last_name));
gridItem1.appendChild(lastName);

var contactNo = document.createElement("p");
contactNo.className = "card-text";
contactNo.appendChild(document.createTextNode("Contact Number: " +donationDetails[0].contact_number));
gridItem1.appendChild(contactNo);

var email = document.createElement("p");
email.className = "card-text";
email.appendChild(document.createTextNode("Email: " +donationDetails[0].email));
gridItem1.appendChild(email);

var gridItem2 = document.createElement("div");
gridItem2.className = ".details-grid-item";

var city = document.createElement("p");
city.className = "card-text";
city.appendChild(document.createTextNode("City: " +donationDetails[0].city));
gridItem2.appendChild(city);

var country = document.createElement("p");
country.className = "card-text";
country.appendChild(document.createTextNode("Country: " +donationDetails[0].country));
gridItem2.appendChild(country);

var province = document.createElement("p");
province.className = "card-text";
province.appendChild(document.createTextNode("Province: " +donationDetails[0].province));
gridItem2.appendChild(province);

gridContainerDiv.appendChild(gridItem1);
gridContainerDiv.appendChild(gridItem2);
secondDivChild.appendChild(gridContainerDiv);
donorDetailsDiv.appendChild(firstDivChild);
donorDetailsDiv.appendChild(secondDivChild);

//Donation details
var thirdDivChild = document.createElement("div");
thirdDivChild.className = "card-header";
thirdDivChild.appendChild(document.createTextNode("Donation Details"));

var fourthDivChild = document.createElement("div");
fourthDivChild.className = "card-body";

var gridItem3 = document.createElement("div");
gridItem3.className = ".details-grid-item";

var gridContainerDiv2 = document.createElement("div");
gridContainerDiv2.className = "details-grid-container";

var organ = document.createElement("p");
organ.className = "card-text";
organ.appendChild(document.createTextNode("Organ: " +donationDetails[0].organ));
gridItem3.appendChild(organ);

var blood_group = document.createElement("p");
blood_group.className = "card-text";
blood_group.appendChild(document.createTextNode("Blood Group: " +donationDetails[0].blood_group));
gridItem3.appendChild(blood_group);

var donation_status = document.createElement("p");
donation_status.className = "card-text";
donation_status.appendChild(document.createTextNode("Donation Status: " +donationDetails[0].donation_status));
gridItem3.appendChild(donation_status);

var gridItem4 = document.createElement("div");
gridItem4.className = ".details-grid-item";

var family_member_name = document.createElement("p");
family_member_name.className = "card-text";
family_member_name.appendChild(document.createTextNode("Family Member Name: " +donationDetails[0].family_member_name));
gridItem4.appendChild(family_member_name);

var family_member_relation = document.createElement("p");
family_member_relation.className = "card-text";
family_member_relation.appendChild(document.createTextNode("Family Member Relation: " +donationDetails[0].family_member_relation));
gridItem4.appendChild(family_member_relation);

var family_member_contact = document.createElement("p");
family_member_contact.className = "card-text";
family_member_contact.appendChild(document.createTextNode("Family Member Contact: " +donationDetails[0].family_member_contact));
gridItem4.appendChild(family_member_contact);

gridContainerDiv2.appendChild(gridItem3);
gridContainerDiv2.appendChild(gridItem4);
fourthDivChild.appendChild(gridContainerDiv2);
donorDetailsDiv.appendChild(thirdDivChild);
donorDetailsDiv.appendChild(fourthDivChild);

var buttonDivChild = document.createElement("div");
buttonDivChild.style.textAlign = "center";
var downloadPDF = document.createElement("button");
downloadPDF.classList.add("blue");
downloadPDF.classList.add("buttons");
downloadPDF.appendChild(document.createTextNode("Download PDF"));
buttonDivChild.appendChild(downloadPDF);
donorDetailsDiv.appendChild(buttonDivChild);

searchDiv.appendChild(donorDetailsDiv);
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
