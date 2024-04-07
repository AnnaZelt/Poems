# Poems Project

This project is a web application for generating and managing poems.

## Technologies Used

- Frontend: React with Redux Toolkit and TypeScript
- Backend: Python Django
- Hosting: Netlify (frontend), Render (backend and database)

## Features

- User registration and login
- User profile management (update and delete)
- Poem generation
- Secure authentication and authorization

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/AnnaZelt/Poems.git`
2. Install dependencies: `cd front/poems` then `npm install` or `yarn install`
3. In `..front/poems/api/apiService.ts`: 
   change line 4 `const API_BASE_URL = process.env.REACT_APP_API_BASE_URL`
   to `const API_BASE_URL = "http://localhost:3000/api/"`
4. Start the frontend: `npm start` or `yarn start`
5. Set up the backend:
   - Install Django and required packages: `cd to ../back` then `pip install -r requirements.txt`
   - Replace `../poems/settings.py` with `../assets/settings.py`
   - Run migrations: `python manage.py migrate`
   - Start the Django development server: `python manage.py runserver`
6. Access the application in your browser at `http://localhost:3000`