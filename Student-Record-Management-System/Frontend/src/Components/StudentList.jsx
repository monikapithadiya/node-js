import React from "react";

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
        overflowX: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#2d3436", fontWeight: "600" }}>
        📋 Student List
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "700px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f1f3f5" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={tdStyle}>{student.name}</td>
              <td style={tdStyle}>{student.email}</td>
              <td style={tdStyle}>{student.phonenumber}</td>
              <td style={tdStyle}>{student.address}</td>
              <td style={tdStyle}>
                <img
                  src={student.img}
                  alt={student.name}
                  style={{ width: "50px", borderRadius: "6px" }}
                />
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => onEdit(student)}
                  style={hoverButton("#a29bfe", "#fff", "#6c5ce7")}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student._id)}
                  style={hoverButton("#74b9ff", "#2d3436", "#4dabf7")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  color: "#2c3e50",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  color: "#495057",
  verticalAlign: "middle",
};

const hoverButton = (bg, color, hoverBg) => ({
  backgroundColor: bg,
  color: color,
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  marginRight: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "background-color 0.3s ease",
});

export default StudentList;
