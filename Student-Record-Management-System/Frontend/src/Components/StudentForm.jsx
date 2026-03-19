import React, { useState, useEffect } from "react";

const StudentForm = ({ onSubmit, selectedStudent, clearForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      img: "",
      email: "",
      phonenumber: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#2c3e50",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        {selectedStudent ? "✏️ Edit Student" : "➕ Add Student"}
      </h2>

      {["name", "img", "email", "phonenumber", "address"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      ))}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#74b9ff",
            color: "#fff",
            border: "none",
            padding: "8px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {selectedStudent ? "Update" : "Add"}
        </button>

        {selectedStudent && (
          <button
            type="button"
            onClick={clearForm}
            style={{
              backgroundColor: "#dfe6e9",
              color: "#2c3e50",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
