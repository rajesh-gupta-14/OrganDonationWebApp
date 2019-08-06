//Action items screen
var appointmentCount = document.getElementById("appointmentCount");
var donationCount = document.getElementById("donationCount");
window.onload = function (){
    fetchCounts();
}

//Switching to appointment approval tabs on clicking the card
var appointmentLink = document.getElementById("appointDiv");
appointmentLink.onclick = function(){
      $('[href="#appointment_approvals"]').tab('show');
      fetchAppointments();
}
//Switching to donation approval tabs on clicking the card
var donationLink = document.getElementById("donationsDiv");
donationLink.onclick = function(){
      $('[href="#donation_approvals"]').tab('show');
      fetchDonations();
}


var actionItemTab = document.getElementById("actionItemTab");

function fetchCounts(){
var xhttp = new XMLHttpRequest();
        var getObject;
        const url = "http://localhost:8000/hospitals/fetch-counts";
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 count_of_appointments = getObject[0].appointment_count;
                 count_of_donations = getObject[0].donation_count;
                 while(appointmentCount.hasChildNodes() && donationCount.hasChildNodes() ){
                   appointmentCount.removeChild(appointmentCount.lastChild);
                   donationCount.removeChild(donationCount.lastChild);
                 }
                 if(count_of_appointments > 1){
                  appointmentCount.appendChild(document.createTextNode( count_of_appointments+ " appointments"));
                 }
                 else{
                   appointmentCount.appendChild(document.createTextNode(count_of_appointments + " appointment"));
                 }
                 if(count_of_donations > 1){
                   donationCount.appendChild(document.createTextNode(count_of_donations+ " donations"));
                 }
                 else{
                   donationCount.appendChild(document.createTextNode( count_of_donations+ " donation"));
                 }

             }
        };
        xhttp.open("GET",url, true);
        xhttp.send();
}

actionItemTab.addEventListener("click",fetchCounts);

//Update profile screen
/*var saveButton = document.getElementById("updateSave");
var clearButton = document.getElementById("updateClear");*/

//Function to alert the user when the profile is updated
function saveUpdatedDetails(){
   Swal.fire({
      type: 'success',
      title: 'Done',
      text: 'Your changes have been saved!',
    });
}

/*function clearUpdatedDetails(){
document.getElementById("hospitalUpdateForm").reset();
}

saveButton.addEventListener("click", saveUpdatedDetails);
clearButton.addEventListener("click", clearUpdatedDetails);*/

//Appointment approval page
var appointmentTable = document.getElementById("appointmentTable"),rIndex;
var appointmentTab = document.getElementById("appointmentTab");
var isAppointmentRowSelected = false;
var donorName;
appointmentTab.addEventListener("click", fetchAppointments);

function fetchAppointments(){
var xhttp = new XMLHttpRequest();
        var getObject;
        const url = "http://localhost:8000/hospitals/fetch-appointments";
        //var searchParam = "?" + "keyword=" +searchInput;
        //console.log(url+searchParam);
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("Number of appointments: ",getObject.length);
                 if(getObject.length <= 0){
                     Swal.fire({
                        type: 'info',
                        title: 'No appointments found',
                      });
                 }
                 else{
                   displayAppointments(getObject);
                 }
             }
        };
        xhttp.open("GET",url, true);
        xhttp.send();
}

function displayAppointments(appointments){
        var appointmentTable = document.getElementById("appointmentTable");
        var tableBody = document.getElementById("appointmentsTableBody");
        var rowLength = tableBody.getElementsByTagName("tr").length;

        //Removing previous search results
        if(rowLength > 0){
          while(tableBody.hasChildNodes()){
           tableBody.removeChild(tableBody.lastChild);
          }
        }

        for(var i = 0; i < appointments.length ; i++){
            var row = document.createElement("tr");
            row.className = "selectable_row";
            var td0 = row.insertCell();
            var td1 = row.insertCell();
            var td2 = row.insertCell();
            var td3 = row.insertCell();
            var td4 = row.insertCell();
            var td5 = row.insertCell();
            var radioBtn = document.createElement("input");
            radioBtn.setAttribute("type","radio");
            radioBtn.setAttribute("name","radioID");
            radioBtn.className = "appointRadios";
            td0.appendChild(radioBtn);
            td1.appendChild(document.createTextNode(appointments[i].appointment_id));
            td2.appendChild(document.createTextNode(appointments[i].first_name + " " + appointments[i].last_name));
            td3.appendChild(document.createTextNode(appointments[i].organ));
            td4.appendChild(document.createTextNode(appointments[i].date));
            td5.appendChild(document.createTextNode(appointments[i].time));
            tableBody.appendChild(row);
            row.onclick = function(){
                //removing the highlighting colour for the unselected rows
                if(typeof rIndex !== "undefined"){
            appointmentTable.rows[rIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
              rIndex = this.rowIndex;
              this.classList.toggle("blue");
              donorName = this.cells[2].innerHTML;
              this.cells[0].childNodes[0].checked = true;

            }
        }
}

//Row selection for appointment approval table
/*for(var i = 0; i < appointmentTable.rows.length; i++){
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
}*/
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
      //Fetching the appointment ID of the selected row
        var radiosAppointment = document.getElementsByClassName("appointRadios");
        var appointmentID;
        for(var i = 0; i<radiosAppointment.length;i++){
         if(radiosAppointment[i].type === "radio" && radiosAppointment[i].checked){
               dummy = ++i;
         }
       }
        appointmentID = appointmentTable.rows[dummy].cells[1].innerHTML;
        console.log("appointment Id: " +appointmentID);

      createPOSTRequest("http://localhost:8000/hospitals/appointments-approval/",true,true,appointmentID);

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
     var radiosAppointment = document.getElementsByClassName("appointRadios");
        for(var i = 0; i<radiosAppointment.length;i++){
         if(radiosAppointment[i].type === "radio" && radiosAppointment[i].checked){
               dummy = ++i;
         }
       }
        appointmentID = appointmentTable.rows[dummy].cells[1].innerHTML;
        console.log("appointment Id: " +appointmentID);

      createPOSTRequest("http://localhost:8000/hospitals/appointments-approval/",true,false,appointmentID);
   }
}

//Function to alert the user regarding details
function detailsOfAppointment(){
        var appointmentID;
        var dummy;

        //Fetching the appointment ID of the selected row
        var radiosAppointment = document.getElementsByClassName("appointRadios");
        for(var i = 0; i<radiosAppointment.length;i++){
         if(radiosAppointment[i].type === "radio" && radiosAppointment[i].checked){
               dummy = ++i;
         }
       }
        appointmentID = appointmentTable.rows[dummy].cells[1].innerHTML;
        console.log("appointment Id: " +appointmentID);

        var xhttp = new XMLHttpRequest();
        var getObject;
        const url = "http://localhost:8000/hospitals/fetch-appointment-details";
        var searchParam = "?" + "appointment_id=" +appointmentID;
        //console.log(url+searchParam);
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("Number of appointments: ",getObject.length);
                 displayAppointmentDetails(getObject);

             }
        };
        xhttp.open("GET",url+searchParam, true);
        xhttp.send();
}


function displayAppointmentDetails(appointment){

var appointmentDiv = document.getElementById("appointment_approvals");

  var removeDiv = document.getElementById("details_of_appointment");
  if (removeDiv != null){
      removeDiv.parentNode.removeChild(removeDiv);
  }
  var appointmentDetailsDiv = document.createElement("div");
  appointmentDetailsDiv.classList = "card";
  appointmentDetailsDiv.classList = "top";
  appointmentDetailsDiv.id = "details_of_appointment";
  var firstDivChild = document.createElement("div");
  firstDivChild.className = "card-header";
  firstDivChild.appendChild(document.createTextNode("Appointment Details"));

  var secondDivChild = document.createElement("div");
  secondDivChild.className = "card-body";

  //Donor details
  var gridContainerDiv = document.createElement("div");
  gridContainerDiv.className = "details-grid-container";

  var gridItem1 = document.createElement("div");
  gridItem1.className = ".details-grid-item";

  var firstName = document.createElement("p");
  firstName.className = "card-text";
  firstName.appendChild(document.createTextNode("First Name: " +appointment[0].first_name));
  gridItem1.appendChild(firstName);

  var lastName = document.createElement("p");
  lastName.className = "card-text";
  lastName.appendChild(document.createTextNode("Last Name: " +appointment[0].last_name));
  gridItem1.appendChild(lastName);

  var contactNo = document.createElement("p");
  contactNo.className = "card-text";
  contactNo.appendChild(document.createTextNode("Contact Number: " +appointment[0].contact_number));
  gridItem1.appendChild(contactNo);

  var email = document.createElement("p");
  email.className = "card-text";
  email.appendChild(document.createTextNode("Email: " +appointment[0].email));
  gridItem1.appendChild(email);

  var city = document.createElement("p");
  city.className = "card-text";
  city.appendChild(document.createTextNode("City: " +appointment[0].city));
  gridItem1.appendChild(city);

  var country = document.createElement("p");
  country.className = "card-text";
  country.appendChild(document.createTextNode("Country: " +appointment[0].country));
  gridItem1.appendChild(country);

  var province = document.createElement("p");
  province.className = "card-text";
  province.appendChild(document.createTextNode("Province: " +appointment[0].province));
  gridItem1.appendChild(province);

  var gridItem2 = document.createElement("div");
  gridItem2.className = ".details-grid-item";

  var appointment_status = document.createElement("p");
  appointment_status.className = "card-text";
  appointment_status.appendChild(document.createTextNode("Appointment Status: " +appointment[0].appointment_status));
  gridItem2.appendChild(appointment_status);

  var date = document.createElement("p");
  date.className = "card-text";
  date.appendChild(document.createTextNode("Appointment Date: " +appointment[0].date));
  gridItem2.appendChild(date);

  var time = document.createElement("p");
  time.className = "card-text";
  time.appendChild(document.createTextNode("Appointment Time: " +appointment[0].time));
  gridItem2.appendChild(time);

  var organ = document.createElement("p");
  organ.className = "card-text";
  organ.appendChild(document.createTextNode("Organ: " +appointment[0].organ));
  gridItem2.appendChild(organ);

  gridContainerDiv.appendChild(gridItem1);
  gridContainerDiv.appendChild(gridItem2);
  secondDivChild.appendChild(gridContainerDiv);
  appointmentDetailsDiv.appendChild(firstDivChild);
  appointmentDetailsDiv.appendChild(secondDivChild);

  appointmentDiv.appendChild(appointmentDetailsDiv);
}


appointmentAcceptBtn.addEventListener("click", acceptAppointment);
appointmentDetailsBtn.addEventListener("click", detailsOfAppointment);
appointmentDenyBtn.addEventListener("click", denyAppointment);

//Donation approval page

var donationTable = document.getElementById("donationTable"),dIndex;
var donationTab = document.getElementById("donationTab");
var donorNameforDonation;
donationTab.addEventListener("click", fetchDonations);

function fetchDonations(){
var xhttp = new XMLHttpRequest();
var getObject;
        const url = "http://localhost:8000/hospitals/fetch-donations";
        //var searchParam = "?" + "keyword=" +searchInput;
        console.log(url);
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("Number of donations: ",getObject.length);
                 if(getObject.length <= 0){
                     Swal.fire({
                        type: 'info',
                        title: 'No donations found',
                      });
                 }
                 else{
                   displayDonations(getObject);
                 }
             }
        };
        xhttp.open("GET",url, true);
        xhttp.send();
}


function displayDonations(donations){
        var donationTable = document.getElementById("donationTable");
        var tableBody = document.getElementById("donationTableBody");
        var rowLength = tableBody.getElementsByTagName("tr").length;

        //Removing previous search results
        if(rowLength > 0){
          while(tableBody.hasChildNodes()){
           tableBody.removeChild(tableBody.lastChild);
          }
        }

        for(var i = 0; i < donations.length ; i++){
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
            radioBtn.className = "selectionRadios";
            td0.appendChild(radioBtn);
            td1.appendChild(document.createTextNode(donations[i].donation_id));
            td2.appendChild(document.createTextNode(donations[i].first_name + " " + donations[i].last_name));
            td3.appendChild(document.createTextNode(donations[i].organ));
            td4.appendChild(document.createTextNode(donations[i].blood_group));
            tableBody.appendChild(row);
            row.onclick = function(){
                //removing the highlighting colour for the unselected rows
                if(typeof dIndex !== "undefined"){
            donationTable.rows[dIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
              dIndex = this.rowIndex;
              this.classList.toggle("blue");
              donorNameforDonation = this.cells[2].innerHTML;
              this.cells[0].childNodes[0].checked = true;

            }
        }
}


/*//Row selection for donation approval table
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
}*/
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

     //Fetching the donation ID of the selected row
        var donationID;
        var radioDonations = document.getElementsByClassName("selectionRadios");
        for(var i = 0; i<radioDonations.length;i++){
         if(radioDonations[i].type === "radio" && radioDonations[i].checked){
               dummy = ++i;
         }
       }
        donationID = donationTable.rows[dummy].cells[1].innerHTML;
        console.log("donation Id: " +donationID);

      createPOSTRequest("http://localhost:8000/hospitals/donations-approval/",false,true,donationID);

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

      //Fetching the donation ID of the selected row
        var donationID;
        var radioDonations = document.getElementsByClassName("selectionRadios");
        for(var i = 0; i<radioDonations.length;i++){
         if(radioDonations[i].type === "radio" && radioDonations[i].checked){
               dummy = ++i;
         }
       }
        donationID = donationTable.rows[dummy].cells[1].innerHTML;
        console.log("donation Id: " +donationID);

      createPOSTRequest("http://localhost:8000/hospitals/donations-approval/",false,false,donationID);
   }
}


function detailsOfDonation(){
        var donationID;
        var dummy;

        //Fetching the appointment ID of the selected row
        var radiosAppointment = document.getElementsByClassName("selectionRadios");
        for(var i = 0; i<radiosAppointment.length;i++){
         if(radiosAppointment[i].type === "radio" && radiosAppointment[i].checked){
               dummy = ++i;
         }
       }
        donationID = donationTable.rows[dummy].cells[1].innerHTML;
        console.log("donationID: " +donationID);

        var xhttp = new XMLHttpRequest();
        var getObject;
        const url = "http://localhost:8000/hospitals/fetch-donation-details";
        var searchParam = "?" + "donation_id=" +donationID;
        //console.log(url+searchParam);
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 getObject = JSON.parse(this.responseText);
                 console.log("Number of donations: ",getObject.length);
                 displayDonationDetails(getObject);

             }
        };
        xhttp.open("GET",url+searchParam, true);
        xhttp.send();
}


function displayDonationDetails(donation){

var donationDiv = document.getElementById("donation_approvals");

  var removeDiv = document.getElementById("details_of_donation");
  if (removeDiv != null){
      removeDiv.parentNode.removeChild(removeDiv);
  }
  var donationDetailsDiv = document.createElement("div");
  donationDetailsDiv.classList = "card";
  donationDetailsDiv.classList = "top";
  donationDetailsDiv.id = "details_of_donation";
  var firstDivChild = document.createElement("div");
  firstDivChild.className = "card-header";
  firstDivChild.appendChild(document.createTextNode("Donation Details"));

  var secondDivChild = document.createElement("div");
  secondDivChild.className = "card-body";

  //Donor details
  var gridContainerDiv = document.createElement("div");
  gridContainerDiv.className = "details-grid-container";

  var gridItem1 = document.createElement("div");
  gridItem1.className = ".details-grid-item";

  var firstName = document.createElement("p");
  firstName.className = "card-text";
  firstName.appendChild(document.createTextNode("First Name: " +donation[0].first_name));
  gridItem1.appendChild(firstName);

  var lastName = document.createElement("p");
  lastName.className = "card-text";
  lastName.appendChild(document.createTextNode("Last Name: " +donation[0].last_name));
  gridItem1.appendChild(lastName);

  var contactNo = document.createElement("p");
  contactNo.className = "card-text";
  contactNo.appendChild(document.createTextNode("Contact Number: " +donation[0].contact_number));
  gridItem1.appendChild(contactNo);

  var email = document.createElement("p");
  email.className = "card-text";
  email.appendChild(document.createTextNode("Email: " +donation[0].email));
  gridItem1.appendChild(email);

  var city = document.createElement("p");
  city.className = "card-text";
  city.appendChild(document.createTextNode("City: " +donation[0].city));
  gridItem1.appendChild(city);

  var country = document.createElement("p");
  country.className = "card-text";
  country.appendChild(document.createTextNode("Country: " +donation[0].country));
  gridItem1.appendChild(country);

  var province = document.createElement("p");
  province.className = "card-text";
  province.appendChild(document.createTextNode("Province: " +donation[0].province));
  gridItem1.appendChild(province);

  var gridItem2 = document.createElement("div");
  gridItem2.className = ".details-grid-item";

  var donation_id = document.createElement("p");
  donation_id.className = "card-text";
  donation_id.appendChild(document.createTextNode("Donation ID: " +donation[0].donation_id));
  gridItem2.appendChild(donation_id);

  var donation_status = document.createElement("p");
  donation_status.className = "card-text";
  donation_status.appendChild(document.createTextNode("Donation Status: " +donation[0].donation_status));
  gridItem2.appendChild(donation_status);

  var organ = document.createElement("p");
  organ.className = "card-text";
  organ.appendChild(document.createTextNode("Organ: " +donation[0].organ));
  gridItem2.appendChild(organ);

  var blood = document.createElement("p");
  blood.className = "card-text";
  blood.appendChild(document.createTextNode("Blood type: " +donation[0].blood_group));
  gridItem2.appendChild(blood);

  var family_member_name = document.createElement("p");
  family_member_name.className = "card-text";
  family_member_name.appendChild(document.createTextNode("Family Member Name: " +donation[0].family_member_name));
  gridItem2.appendChild(family_member_name);

  var family_member_relation = document.createElement("p");
  family_member_relation.className = "card-text";
  family_member_relation.appendChild(document.createTextNode("Family Member Relation: " +donation[0].family_member_relation));
  gridItem2.appendChild(family_member_relation);

  var family_member_contact = document.createElement("p");
  family_member_contact.className = "card-text";
  family_member_contact.appendChild(document.createTextNode("Family Member Contact: " +donation[0].family_member_contact));
  gridItem2.appendChild(family_member_contact);


  gridContainerDiv.appendChild(gridItem1);
  gridContainerDiv.appendChild(gridItem2);
  secondDivChild.appendChild(gridContainerDiv);
  donationDetailsDiv.appendChild(firstDivChild);
  donationDetailsDiv.appendChild(secondDivChild);

  donationDiv.appendChild(donationDetailsDiv);
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
        var sIndex;

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
                console.log("type of sindex: " +typeof sIndex);
                console.log("SIndex: " +sIndex);
                console.log("Row index: " +this.rowIndex);
                //removing the highlighting colour for the unselected rows
                if(typeof sIndex !== "undefined"){
            searchTable.rows[sIndex].classList.toggle("blue");
            this.cells[0].childNodes[0].checked = false;
        }
        //highlighting the selected row and enabling the corresponding radio button
              sIndex = this.rowIndex;
              this.classList.toggle("blue");
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
firstDivChild.classList.add("card-header");
firstDivChild.classList.add("bg-light");
firstDivChild.classList.add("mb-3");
firstDivChild.style.color = "black";
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
thirdDivChild.classList.add("card-header");
thirdDivChild.classList.add("bg-light");
thirdDivChild.classList.add("mb-3");
thirdDivChild.style.color = "black";
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



var approved_by = document.createElement("p");

approved_by.className = "card-text";

approved_by.appendChild(document.createTextNode("Approved by: " +donationDetails[0].approved_by));

gridItem3.appendChild(approved_by);



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

downloadPDF.id = "download_pdf";

downloadPDF.onclick = function(){

       //Fetching donation id
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
        console.log("donId for pdf: " +donationId);

     var xhttp = new XMLHttpRequest();

     var URL_ = "http://localhost:8000/hospitals/view-pdf/" + donationId + "/";

     xhttp.onreadystatechange = function() {

             if (this.readyState == 4 && this.status == 200) {
				 var blob = new Blob([this.response], {type: 'application/pdf'}); // pass a useful mime type here
				var url = URL.createObjectURL(blob);
                 window.open(url);

         }

        }

        xhttp.open("GET",URL_, true);
		    xhttp.responseType= "arraybuffer";
        xhttp.send();



}
buttonDivChild.appendChild(downloadPDF);

donorDetailsDiv.appendChild(buttonDivChild);


searchDiv.appendChild(donorDetailsDiv);
}




//Function to alert the user when email button is clicked
function emailDonor(){
    if(isSearchRowSelected()){
      //Fetching donation id
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
        console.log("donId for pdf: " +donationId);

      var xhttp = new XMLHttpRequest();

     var URL_ = "http://localhost:8000/hospitals/email-donor/" + donationId + "/";

     xhttp.onreadystatechange = function() {

             if (this.readyState == 4 && this.status == 200) {
           Swal.fire({
          type: 'success',
          title: 'Done',
          text: 'An email has been sent to ' +donorToContact,
          });

         }

        }
        xhttp.open("GET",URL_, true);
        xhttp.send();

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

/*var logOut = document.getElementById("logOut");
//var changePassword = document.getElementById("changePassword");

//Function to alert the user when logout option is selected
function performLogOut(){
Swal.fire({
      type: 'info',
      title: 'In progress',1
      text: 'The logout feature will be availabe soon!',
      footer: 'Thanks for your patience.'
    });
}

logOut.addEventListener("click", performLogOut);
*/

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

function createPOSTRequest(url,isAppointment,isAccept,id){
  console.log("Is appointment: " +isAppointment);
  console.log("Is accept: " +isAccept);
  console.log("ID: " +id);
  var xhttp = new XMLHttpRequest();
  var actionToPerform;
  if(isAccept){
  actionToPerform = "Approved";
  }
  else{
    actionToPerform = "Denied";
  }
  console.log("ID=" +id+ "&action=" +actionToPerform);
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             if(isAppointment && isAccept){
              Swal.fire({
              type: 'success',
              title: 'Done',
              text: donorName+ "\'s appointment has been approved!",
              footer: 'Next step: The donation can now be accepted or denied under the pending donations approval tab.'
            });
              appointmentTable.deleteRow(rIndex);
              rIndex = undefined;
             }
             else if(isAppointment && !isAccept){
                Swal.fire("Done",donorName+ "\'s appointment has been denied!","success");
                appointmentTable.deleteRow(rIndex);
                rIndex = undefined;
             }
             else if(!isAppointment && isAccept){
               Swal.fire({
              type: 'success',
              title: 'Done',
              text: donorNameforDonation+ "\'s donation has been approved!",
              footer: 'Next step: The donation can now be searched under the search donations tab.'
            });
              donationTable.deleteRow(dIndex);
              dIndex = undefined;

             }
              else if(!isAppointment && !isAccept){
                Swal.fire("Done",donorNameforDonation+ "\'s donation has been denied!","success");
              donationTable.deleteRow(dIndex);
              dIndex = undefined;
             }
         }
    };
    xhttp.open("POST",url,true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ID=" +id+ "&action=" +actionToPerform);

}

var updateProfileTab = document.getElementById("updateProfileTab");

updateProfileTab.addEventListener("click", getProfileDetails);

function getProfileDetails(){
  console.log("in getProfileDetails");
  var xhttp = new XMLHttpRequest();
  var url = "http://localhost:8000/hospitals/get-user-details";
  var hospital;
  xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 hospital = JSON.parse(this.responseText);
                 displayProfileDetails(hospital);
         }
        }
        xhttp.open("GET",url, true);
        xhttp.send();
}

function displayProfileDetails(hospital){
  document.getElementById("hospitalName").value = hospital[0].hospital_name;
  document.getElementById("emailHospital").value = hospital[0].hospital_email;
  document.getElementById("city").value = hospital[0].hospital_city;
  document.getElementById("hospitalContact").value = hospital[0].hospital_contact;
  document.getElementById('input-province').value = hospital[0].hospital_province;

}

function checkpassword(){
  if (document.getElementById('password3').value == document.getElementById('password2').value) {
    document.getElementById('password-validation-msg').innerHTML = "Passwords matched!";
    document.getElementById('update-password').disabled = false;
  } else {
    document.getElementById('password-validation-msg').innerHTML = "Passwords do not match yet!";
    document.getElementById('update-password').disabled = true;
  }
}
function enableedituserprofile(){
  document.getElementById('hospitalName').disabled = false;
  document.getElementById('emailHospital').disabled = false;
  document.getElementById('city').disabled = false;
  document.getElementById('input-province').disabled = false;
  document.getElementById('hospitalContact').disabled = false;
  document.getElementById('submitUpdateProf').disabled = false;
}
function enableeditpasswords(){
  document.getElementById('password1').disabled = false;
  document.getElementById('password2').disabled = false;
  document.getElementById('password3').disabled = false;
  document.getElementById('update-password').disabled = false;
}

var updateProfile = document.getElementById("submitUpdateProf");

updateProfile.addEventListener("click", updateProfileDetails);

function updateProfileDetails(){
  var url = "http://localhost:8000/hospitals/update-user-details/";
  var name = document.getElementById("hospitalName").value;
  var email = document.getElementById("emailHospital").value;
  var city =  document.getElementById("city").value;
  var contact = document.getElementById("hospitalContact").value;
  var province = document.getElementById('input-province').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
               console.log("profile updated");
            updateSuccess();
         }
        }
        xhttp.open("POST",url,true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name=" +name+ "&email=" +email+ "&city=" +city+
          "&contact=" +contact+ "&province=" +province);

}

var updatePwd = document.getElementById("update-password");

updatePwd.addEventListener("click", updatePasswordDetails);

function updatePasswordDetails(){
  console.log("in updatePasswordDetails()");
  var url = "http://localhost:8000/hospitals/update-pwd-details/";
  var old_password = document.getElementById("password1").value;
  var new_password = document.getElementById("password2").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
               console.log("pwd updated");
            Swal.fire("Done","Password details updated successfully!","success");
         }
        }
        xhttp.open("POST",url,true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("old_password=" +old_password+ "&new_password=" +new_password);

}

function updateSuccess(){
  Swal.fire("Done","Profile details updated successfully!","success");
}
