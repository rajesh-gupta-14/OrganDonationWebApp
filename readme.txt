CONTENTS OF THIS FILE
---------------------
   
 * Introduction

Project background

Donating one or more of your organs after your death can help save another person's life. Over 4,500 people in Canada are now waiting for the gift of an organ to become available for an organ transplant. The one of its kind website for organ donation allows a faster and a much better way to save lives. Stakeholders include donor families, community volunteers, professionals, private sector companies and hospitals.

Project purpose
The purpose of the website is to provide open access to donors and receivers by interconnecting a wide range of hospitals across Canada. This will allow hospitals to perform surgery by getting all the information of donors and receiver, perform matching of organs as per various factors and in-turn save lives. Our main goal is to implement a web service for people who are in direct need of an organ and the website hopes to provide them a solution that allows accessing complete information required for organ transplant without any hassles.

About the pages
The current website for organ donation consists of pages: 
-login
-forgot password,
-registration page 
-donor appointment form page. 

 Framework used:

 Front-end: Bootstrap framework has been used to develop the web application as it easy to work with along with HTML and CSS. The frontend of the website has been developed using HTML, CSS and Bootstrap 
 Back-end : Django framework is used for storing, retrieving and managing the database. Django provides inbuilt SQLite support that allows easy storage and retrival.


 * Requirements
	Any Web browser, preferably Chrome


 * About the feature

	-Appointment Management.

	This feature includes appointment form for donor to book an appointment with the hospital for donation,checkup,visit a doctor and others.
	The donor needs to fill the form before booking an appointment. 
	Each field is mandatory and need to pass validations.
	Once the appointment is fixed the status is changed to approved from pending.
        Additional changes are to be implemented on my team mates page that is donor homepage hence for this assignment, once a successful entry is created it returns a success message.

	-Also I have created the all the tables in the database for the entire project.


 * About the files in the project.
	Django follows model-view-controller architecture.
	
	Model
	The models.py file in the project contains the structure of the project and all the tables of the database.
	
	View
	The view.py file in the project contains all the functions and logic for the project.
	
	Controller
 	Django controller takes over to look for the corresponding view via the url.py file. In the urlpatterns, mapping between urls and view is done. 

	The html files are in template folder. CSS and JS files are placed in static folder to maintain the hierarchy
	 

 * Installation
	-Install python of version 3 or higher.
	-Check that python is installed correctly with python -v command
	-Create a virtual environment to suppress the versioning issues of python
		- Create a folder(I have used test1-->env-for-project folder) in your cloned project from git.
		- Open command prompt and change directory to this newly created folder.
		- Type virtualenv <name_of_folder>
		- Once virtual environment is created, we need to activate it by cd Scripts and activate command.
	-Installing Django
		Type pip install django

 * Steps to run the project.
	- Clone the project from git.
	- Open command prompt and change the directory to the project.
	- Activate the virtual environment(optional)
	- Create superuser to get admin access.
	- Type python manage.py createsuperuser.
	- Type python manage.py runserver to begin the Django server.
	- To stop server type control-c.

 * W3C valiations are checked for appointment-page.html file, however as Django requires changes to be made in html code by adding tokens such as {{}} and{{% %}} these validations might fail.  	

Git link:
git@git.cs.dal.ca:viveks/a5_shah_vivek_b00799155.git


 * Maintainers

	 Vivek Shah

 *References

 Bootstrap: Bootstrap v3.3.7 (http://getbootstrap.com)

 https://docs.djangoproject.com/en/2.1/

 Font Awesome: https://fontawesome.com/

 Appointment form referred from https://codepen.io/andrewwright/pen/bHaFJ

