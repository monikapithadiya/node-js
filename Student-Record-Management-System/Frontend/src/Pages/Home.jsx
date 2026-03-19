import React, { useState, useEffect } from "react";
import StudentForm from "../Components/StudentForm";
import StudentList from "../Components/StudentList";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../Services/StudentService";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    const res = await getAllStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (formData) => {
    if (selectedStudent) {
      await updateStudent(selectedStudent._id, formData);
    } else {
      await addStudent(formData);
    }
    setSelectedStudent(null);
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "30px",
          fontSize: "28px",
        }}
      >
        🎓 Student Record Management
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Form Section */}
        <div
          style={{
            flex: "1 1 350px",
            maxWidth: "400px",
            width: "100%",
            backgroundColor: "#ffffff",
            border: "1px solid #dcdcdc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <StudentForm
            onSubmit={handleSubmit}
            selectedStudent={selectedStudent}
            clearForm={() => setSelectedStudent(null)}
          />
        </div>

        {/* Table Section */}
        <div
          style={{
            flex: "2 1 700px",
            width: "100%",
            backgroundColor: "#ffffff",
            border: "1px solid #dcdcdc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <StudentList
            students={students}
            onEdit={setSelectedStudent}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
