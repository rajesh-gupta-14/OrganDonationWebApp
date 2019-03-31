ORGAN DONATION WEB APPLICATION:

Backend framework:
Django 2.1
Database used:
SQLite3

-------------My features:----------------------
Initially, I had taken up 2 features in assignment 3: User profile management, and Form to PDF

However, I am planning to take up an additional feature called "Email sending feature" - One use case is sending an email when
the user forgets his/her password. And thus for this assignment, I have completed User profile management and send email feature.

User profile management is a two-sided feature here, i.e., on the donors side and the hospitals side.

-------------Completed  tasks on the donor side:----------------
Registration, 
Login, 
Edit User Profile and Change password

-------------Completed tasks on the hospital side:-----------------
Registration,
Login

On the hospitals side, you will notice that the hospital edit profile page is not there yet as one of the other developers is working on it.
However, the back-end code is exactly the same as it is on the donor side which is presented in this assignment. 

And, when the donors are logged in, they are redirected to the "edit user profile" page rather than home as this page is with the other
developer but the functionality works just fine.

Finally, when the hospitals are logged in, they are redirected to the same login page where the reason is explained clearly (also discussed 
during the lab tutorial on 21/03/2019). Basically, since the project has multiple developers working on it, there was a lot of circular dependency and since this is an individual assignment, we have implemented the features and integrating them should not be a problem.

------------------INSTALLATION AND WORKING INSTRUCTIONS:---------------------

Open your terminal and do the following:

1. Clone the git repository using: 
>git clone https://git.cs.dal.ca/rgupta/a4_rajeshkumargupta_lakshminarayangupta.git

2. Change into a4_rajeshkumargupta_lakshminarayangupta repository 
>cd a4_rajeshkumargupta_lakshminarayangupta

3. Install django and xhtml2pdf using: [1]
>pip install --no-cache-dir django
>pip install --no-cache-dir xhtml2pdf

4. Run the following commands to create a new database and start the local development server to test run the application:
Make sure you are inside the first level of cloned repo - organ_donation because this is where the "manage.py" file is located. (the root folder, not the inner one)
>python manage.py makemigrations
>python manage.py migrate
>python manage.py runserver

OUTPUT:

System check identified no issues (0 silenced).
March 22, 2019 - 19:47:31
Django version 2.1.7, using settings 'organ_donation.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

5. Now, let's test the DONOR SIDE:

Go to: http://127.0.0.1:8000/donors/register/

Fill the following details on page and register. Please remember that you will be using your USERNAME to login
and not the email. And also, please give a valid DAL email id because you will also be testing out the forgot password functionality.

You will be redirected to login page where you will use your username and password to login. You will be redirected to "edit user profile"
page as explained earlier.

You can test out the functionality and I've written proper backend validations for change password to work intuitively.

Once you are done testing logout using Settings/Logout button on top-right of the screen.

You should be back to login page now. Now, let's test out the forgot password functionality by clicking on forgot password.

You should now be at: http://127.0.0.1:8000/donors/forgot-password/

Enter your registered username and a password will be sent to your email id. Go ahead, please get the new password from by visiting your email
account and enter the credentials on the login page to repeat the drill.

6. Let's test the HOSPITAL SIDE:

Go to: http://127.0.0.1:8000/hospitals/register/

Fill the following details on page and register. Please remember that you will be using your USERNAME to login
and not the email. And also, please give a valid DAL email id because you will also be testing out the forgot password functionality.

You will be redirected to login page where you will use your username and password to login. You will be redirected to the same login page
page as explained earlier with the following message, provided your credentials are correct:

"""
Logged in successfully. The homepage is with the other developer who is working on it. But, the remaining functionality works the exact same way it does on donor side. Hence, you are being redirected to same login page.
"""
If credentials are wrong, it will send an invalid user message.

You can now quit the server. Email feature and user profile management feature is done.
-------------------------------------------------
On the hospital side, like I explained earlier, the "edit profile" and "homepage" is with the other developers. However, edit profile functionality is exactly the same as it is on the donors side. And intergration will not be a problem as the functionality is working fine.

One of the other important features of the web application I am working on is Form to PDF and it is almost ready.

Additionally, you can also create a superuser by running the command: [2]
>python manage.py createsuperuser
Enter details
Launch the server again using
>python manage.py runserver 
and visit:
http://127.0.0.1:8000/admin/ to checkout the admin console in django where you can see the registered users.


------------W3C validation:---------------
W3C validation worked perfectly well for assignment 2, but since django framework is involved now, the django and pythonic expressions CANNOT BE W3C VALIDATED.

-------------File structure:---------------------
There are two web apps as this web project has donors and hospitals.

>a4_rajeshkumargupta_lakshminarayangupta(project root)

>>donors
>>>>views.py
>>>>models.py
>>>>urls.py

>>hospitals
>>>>views.py
>>>>models.py
>>>>urls.py

>>templates
>>>>.*.html files

>>static
>>>>.*.css files
>>>>.*.js files

>>manage.py (manager file)

>>db.sqlite3 (database)

>>media (empty - other developers may require)

-------------Validation and usability-----------
Appropriate user feedbacks and back-end validations are provided in the project.

-------------References-----------------

[1]"Quick install guide | Django documentation | Django", Docs.djangoproject.com, 2019. [Online]. Available: https://docs.djangoproject.com/en/2.1/intro/install/. [Accessed: 22- Mar- 2019].

[2]"Writing your first Django app, part 2 | Django documentation | Django", Docs.djangoproject.com, 2019. [Online]. Available: https://docs.djangoproject.com/en/2.1/intro/tutorial02/. [Accessed: 22- Mar- 2019].