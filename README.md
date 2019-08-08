# django-todo-app

This application allows Admin to Add/Update/Delete Todo Tasks , Also Admin Interface to view,search and filter the tasks.  
The Non-Admin User can View / Update / Delete Tasks .


# TechStack Used :
Python==3.6 , Django==2.1  , sqlite3 

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
