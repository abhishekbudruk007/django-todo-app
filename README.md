# django-todo-app

    This application allows Admin to Add/Update/Delete Todo Tasks , Also Admin Interface to view,search and filter the tasks.
    The Non-Admin User can View / Update / Delete Tasks .


# TechStack Used :
    Backend : Python==3.6 , Django==2.1  , sqlite3
    Frontend : HTML5 , Bootstrap , Javascript , Ajax , jQuery

# Note : This project makes used of Django's Class Based Views

# Following Problem Statement is being Covered : 

    Create a TO-DO list app
    Tech Stack to be used: Python, Django (Use latest versions)
    Requirements:
    1. The app should have following fields:
       Title
       Description
       Date & time of the To-do task.
       Status (In progress, completed, pending)
       Created at & Modified at
       is deleted

    2. Login & Authentication is not required.

    3. App should handle all the CRUD operations. No fancy things required in frontend. Basic
    form/list view is enough.

    4. Create Django admin interface for this so that an admin user can login and add the
    entries. The entry deleted from non-admin interface should be still visible for the Admin.

    5. Admin view should have list display with all the fields from point 1 above.
    Provide search and filtering with required fields in the admin interface.

    6. Admin should be able to download the bulk entries of to-do list in csv format from
    Django Admin Interface.

    7. Create an API to list all the to do items as well as individual item without using any API
    Framework.



# Steps to Run this Project

    Step 1 : Clone the project git@github.com:abhishekbudruk007/django-todo-app.git

    Step 2 : cd ~/django-todo-app

    Step 3 : Create Virtualenv (Python 3)
             virtualenv -p python3 venv

    Step 4 : Activate Virtualenv
             source venv/bin/activate

    Step 5 : Install Dependencies
             pip install -r requirements.txt

    Step 6 : Migrate To Database
             python manage.py migrate

    Step 7 : Create Admin
             python manage.py createsuperuser
             # Give Username and Password of Your Choice

    Step 8 : Run the Project
             python manage.py runserver
             # This will run project on 127.0.0.1:8000

             You can mention port and ip of your choice
             python manage.py runserver 0.0.0.0:3000

    Step 9 : Open url http://0.0.0.0:3000/ in browser

    Step 10: http://0.0.0.0:3000/admin to acess admin panel. ( Provide Username and Password you used while creating admin)