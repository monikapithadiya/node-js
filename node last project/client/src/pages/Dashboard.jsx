import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", branch: "", rollNo: "", email: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    setFormData({ name: "", branch: "", rollNo: "", email: "" });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, { method: "DELETE" });
    fetchStudents();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
        <input type="text" placeholder="Branch" value={formData.branch} onChange={(e)=>setFormData({...formData, branch:e.target.value})} />
        <input type="number" placeholder="Roll No" value={formData.rollNo} onChange={(e)=>setFormData({...formData, rollNo:e.target.value})} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} />
        <button type="submit">Add Student</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Branch</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu._id}>
              <td>{stu.name}</td>
              <td>{stu.branch}</td>
              <td>{stu.rollNo}</td>
              <td>{stu.email}</td>
              <td><button onClick={() => deleteStudent(stu._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
