# AI Chatbot - FastAPI & React

This project is a full-stack application that provides a chatbot interface powered by the Gemini AI model. Users can register, log in, ask questions, and view their chat history.

The backend is built with **FastAPI**, while the frontend is built with **React**.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Setup](#project-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies

- **Backend**: FastAPI, SQLAlchemy, SQLite/PostgreSQL
- **Frontend**: React, Axios
- **Authentication**: JWT Tokens
- **Database**: SQLite or PostgreSQL
- **API**: Gemini AI (via API call)
- **Environment Variables**: dotenv

---

## Project Setup

### Backend Setup

1. **Clone the repository**:

2. **Install dependencies**:

Make sure you have Python 3.8+ installed. Install required libraries using pip:

```
pip install -r requirements.txt
```

3. **Set up the database**:

If you're using SQLite, the database will be created automatically. For PostgreSQL, ensure your `DATABASE_URL` in the `.env` file is configured properly.

4. **Create the `.env` file**:

Example `.env` file:

```ini
DATABASE_URL=sqlite:///./test.db
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_jwt_secret_key_here
```

5. **Run the backend**:

```
uvicorn app.main:app --reload
```

This will start the FastAPI server at http://localhost:8000.

The app will be available at `http://localhost:5173`.

---

## Project Structure

- **src**: Contains all the React components and logic.
- **components**: React components used in the application (Login, Register, PrivateRoute, etc.).
- **axiosInstance.js**: The file where Axios is configured to communicate with the backend API.
- **App.js**: The main entry point of the app.

- **public**: Contains the `index.html` and other static assets.

---

## Features

- **User Registration**: Allows new users to register by providing a `username` and `password`.

- **User Login**: Authenticated users can log in with their credentials and receive a JWT token.

- **Ask Questions**: Logged-in users can ask questions to the Gemini AI chatbot. Responses are displayed in real-time.

- **View Question History**: Users can view their past questions and answers, ordered by timestamp.

---

## Configuration

You can configure the backend API URL in the `axiosInstance.js` file to match your server's address.

```js
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Update with your backend URL
});
```
