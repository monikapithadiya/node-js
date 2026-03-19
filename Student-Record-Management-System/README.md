
# 🧑‍🎓 Student Record Management System (Full Stack Project)

## 📚 Description
This is a basic full-stack project where users (admin) can perform CRUD operations (Create, Read, Update, Delete) for managing student records.

---

## 📌 Tasks to be Performed by Student

### Backend (Node.js + Express + MongoDB)
1. Setup Express server in `server.js`.
2. Create MongoDB connection file in `config/db.js`.
3. Define a Student model in `models/studentModel.js`.
4. Create routes in `routes/studentRoutes.js` for:
   - Add a new student (POST)
   - Get all students (GET)
   - Edit student details (PUT)
   - Delete student (DELETE)
5. Implement logic in `controllers/studentController.js` for each route.
6. Add custom middleware in `middlewares/logger.js` to log each request.
7. Test all APIs using Postman.

### Frontend (React)
1. Create a new React app.
2. In `src/components/`, create:
   - `StudentForm.jsx` for adding/editing student details.
   - `StudentList.jsx` to list all students with edit/delete buttons.
3. In `src/pages/Home.jsx`, show form and list side-by-side.
4. In `src/services/studentService.js`, write Axios calls for backend APIs.
5. Integrate frontend with backend using Axios.
6. Add loading indicators and validations (Bonus).

---

## ✅ Folder Structure

### Backend
```
server/
├── config/
│   └── db.js
├── controllers/
│   └── studentController.js
├── middlewares/
│   └── logger.js
├── models/
│   └── studentModel.js
├── routes/
│   └── studentRoutes.js
├── server.js
└── .env
```

### Frontend
```
client/
├── src/
│   ├── components/
│   │   └── StudentForm.jsx
│   │   └── StudentList.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── studentService.js
│   ├── App.js
│   └── main.jsx
```

---

## 💡 Bonus Suggestions
- Use Bootstrap or Material UI for styling.
- Add student image upload (extra).
- Deploy app on Render/Netlify (optional).

