TO USE EXISTING DB DETAILS:

Installation:
> pip install -r requirements.txt
> python manage.py runserver


Go to: http://localhost:8000/home/ 

Hospital side login:
Uname: rajesh
Pass: rajesh14 

Donor side login:
Uname: hemanth
Pass: rajesh15

PLEASE NOTE THAT IF YOU USE EXISTING DB, all the forgot password emails will be directed to "rajesh.gupta@dal.ca". Hence, create a new user
in the existing DB to test such features.
================================================================

TO CREATE NEW DB AND DELETE EXISTING DETAILS:
=>Delete db.sqlite3 file
=>Delete migrations/ folder inside donors/ and hospitals/ folder
Run these commands post that:
> python manage.py makemigrations hospitals donors
> python manage.py migrate

================================================================

WORKING INSTRUCTIONS ON HOSPITAL SIDE:

1) Open a browser and visit http://localhost:8000/hospitals/login/ to login.
2) The home page displays an action items tab which gives the summary of number of pending appointments and pending donations.
   The count displayed is dynamic and gets updated automatically as and when the appointment/donation requests come for approval.
3) Switch to 'Pending appointment approvals' tab by either clicking on the action item card or by manually navigating to the tab.
   A list of pending appointments will be displayed.
4) Select a record and click on 'Details' button, the details of the appointment will be displayed below the table.
5) Select a record and click on 'Approve' button, the appointment will be approved and the donation will be moved to the 
   'Pending donation approvals' tab. 
6) If an appointment is denied, the donation request will not be eligible for getting approved or denied. That is, the donation
   request will not be moved to 'Pending donation approvals' tab.
7) Click on 'Pending donation approvals' tab to view the pending donations. Alternatively this tab can also be selected by clicking
   on the corresponding card in the home screen.
8) Select a donation record and click on 'Details' button, the details of the donation will be displayed below the table.
9) Select a donation record and click on 'Approve' button, the donation will be approved. Likewise, the donations can also be denied.
10) Navigate to the 'Search donations' tab. Enter any keyword related to the donation, such as organ/blood group/donor first name
/donor last name/donation ID (For eg: Kidney/Hemanth) and click on search button. 
11) From the search results displayed, select a record and click on the 'Details' button. The entire details of the donation will be displayed 
below the table. Note that only the approved donations will be displayed in the search results. 

Note: For viewing the database records, kindly follow the below steps:
1) Stop the server by pressing CTRL + C
2) Run python manage.py createsuperuser
3) Enter neccessary details such as username, email, and password
4) Launch the server again using python manage.py runserver 
5) Visit http://127.0.0.1:8000/admin/ and login using the username and password that was created in step 3. 
6) The users table consists of user records, the appointments table consist of appointment information, and the donation requests table
   contains donation related information.
   
================================================================

WORKING INSTRUCTIONS ON DONOR SIDE:
1) Open a browser and visit http://localhost:8000/donors/login/ to login.
2) Create Donation Request and create a corresponding appointment for that donation request.
3) View Donation History on homepage

=================================================================
