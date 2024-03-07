# Getting Started with Poems
## This app uses MySql for DB management
## and uses MySql community server and MySql Workbench

## Clone this repository
### git clone https://github.com/AnnaZelt/Poems.git

## Create a virtual environment
### cd Poems/back
### pip install virtualenv 
Installs the virtual envoronment on your computer
    
### py/python -m virtualenv myenv
Installs the virtual envorinment on your project
    
### myenv\Scripts\activate
Activates the virtual environment

## Install the packages for the backend
### pip install -r Requirements.txt
### pip freeze > Requirements.txt

## Replace the following line with your MySql DB password
### DATABASES = {
###     'default': {
###         ...
###         ...
###         'PASSWORD': 'Your_MySql_Password',
###         ...
###     }
### }

### Replace the following line with your own secret key
Run the command:
### py/python manage.py shell -c "from django.core.management.utils import get_random_secret_key; print('Your secret key: ',get_random_secret_key())"
Then replace the line
### SECRET_KEY = 'Your_Secret_Key'
With the result you get in the cli

## run the backend server
### py/python manage.py runserver

## Install the packages for your frontend
### cd ..
### cd front/poems
### npm i

## Run the frontend server
### npm start
