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
2. Install dependencies: `cd your-repository` then `npm install` or `yarn install`
3. Start the frontend: `npm start` or `yarn start`
4. Set up the backend:
   - Install Django and required packages: `pip install -r requirements.txt`
   - Run migrations: `python manage.py migrate`
   - Start the Django development server: `python manage.py runserver`
5. Access the application in your browser at `http://localhost:3000`

## Deployment

To deploy the frontend on Netlify and the backend on Render, follow these steps:

1. Set up continuous deployment for the frontend and backend in their respective hosting platforms.
2. Add environment variables for production settings, such as API URLs and database configurations.
3. Deploy the frontend and backend using the hosting platforms' deployment tools.
(Make sure to use the guides as they help a lot)
