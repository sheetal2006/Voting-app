# 🗳️ Voting App

This is a full-stack Voting Application where users can log in and vote for candidates. The project is divided into frontend and backend, with clear modular separation.

---

## 📁 Folder Structure

```
VOTING-APP/
├── backend/
│   ├── db.js
│   ├── jwt.js
│   ├── server.js
│   ├── models/
│   │   ├── candidateModel.js
│   │   └── userModel.js
│   └── routes/
│       ├── candidateRoutes.js
│       └── userRoutes.js
├── index.html
├── vote.html
├── login.css
├── style.css
├── script.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org) installed
- Git

---

## 🚀 How to Run the Server

📦 Follow the steps below to run the backend server:

```bash
# Step 1: Navigate to backend folder
cd backend

# Step 2: Install node dependencies
npm install

# Step 3: Start the server
node server.js

# If using nodemon (recommended during development)
npx nodemon server.js
```

The server will start on:  
📍 `http://localhost:3000` (or `5000` depending on your configuration)

Make sure your frontend (JavaScript) fetch requests use this URL when testing locally.

---

## 🌐 How to Run Frontend

If your frontend is made with basic HTML/CSS/JS:

```bash
# Navigate to the root folder and open index.html
cd ..
start index.html
```

Or just double-click `index.html` to open in your browser.

---

## ✅ Test Users

You can use the following credentials for testing:

```
Aadhar: 987654321098
Password: anjali@123

      AND

Aadhar: 987654456098
Password: santi@345
```

> Or create a new user by sending a `POST` request to:  
> `http://localhost:3000/user/signup`  
> using Thunder Client or Postman.

---

## 📌 Notes

- Ensure `db.js` contains the correct MongoDB connection URI.
- Use `.env` file for storing sensitive credentials, and add it to `.gitignore`.

---

## 🔒 Security

This project uses `JWT (JSON Web Token)` for secure authentication.

---

## 🔗 Live Demo (If Deployed)

Frontend: [https://sheetal2006.github.io](https://sheetal2006.github.io)  
Backend (Render/Other): _Coming Soon_

---

## 🙋‍♀️ Author

**Sheetal Chaturvedi**  
GitHub: [@sheetal2006](https://github.com/sheetal2006)
