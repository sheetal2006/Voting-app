# 🗳️ Online Voting App

A simple full-stack **Voting Application** where users can **register**, **log in using their Aadhar number**, and **vote for their favorite political party**. The app ensures that each user can vote only once. Built using **Node.js**, **Express**, **MongoDB**, and **HTML/CSS/JavaScript**.

---

## 🚀 Features

- ✅ Voter registration with Aadhar number
- ✅ Secure login with password and JWT token
- ✅ Vote only once per user
- ✅ Token-based authentication
- ✅ Simple and clean frontend

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JWT
- **Password Hashing:** bcrypt

---

## 📁 Folder Structure

```
voting-app/
├── backend/
│   ├── models/
│   │   ├── candidate.js
│   │   └── user.js
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── userRoutes.js
│   ├─----db.js
│   │  
│   ├──------jwt.js
│   │ 
│   ├── .env
│   └── server.js
├── frontend/
│   ├── index.html         # Voting page
│   ├── login.html         # Login page
│   ├── script.js
│   └── style.css
├── package.json
└── README.md

```

---

## ⚙️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/voting-app.git
   cd voting-app
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` file in the backend folder**
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the backend server**
   ```bash
   nodemon server.js
   ```

5. **Open `frontend/login.html` in browser to log in**
   - After successful login, token is printed in console and stored in `localStorage`.

6. **Then open `frontend/index.html` to vote**

---

## ✅ Test User

You can use the following for testing:

```
Aadhar: 987654321098
Password: anjali@123

      AND

  Aadhar:987654456098
  password:santi@345
```

> Or create a new user by sending POST request to `http://localhost:3000/user/signup` using Thunder Client/Postman.

---

## 💡 Notes

- You must log in before voting — token is required.
- All radio input values must be the **MongoDB `_id`** of the candidates.
- A user can vote only **once**.

---

## 📧 Contact

For questions or feedback, contact sheetal chaturvedi
(mailto:sheetalchaturvedi2006@gmail.com)

