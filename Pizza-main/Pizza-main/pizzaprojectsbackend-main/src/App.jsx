import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", size: "" });

  useEffect(() => {
    axios.get("http://localhost:1919/").then((res) => {
      setPizzas(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1919/", form).then(() => {
      alert("Pizza Added!");
      window.location.reload();
    });
  };

  return (
    <div>
      <h1>Pizza Menu</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Size" onChange={(e) => setForm({ ...form, size: e.target.value })} />
        <button>Add Pizza</button>
      </form>
      <ul>
        {pizzas.map((pizza, index) => (
          <li key={index}>
            {pizza.name} - ₹{pizza.price} [{pizza.size}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
