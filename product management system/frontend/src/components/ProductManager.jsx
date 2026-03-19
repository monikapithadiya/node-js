import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const API = "http://localhost:5000/products";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  price: "",
  category: "",
  stock: ""
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      if (Array.isArray(res.data)) setProducts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, {
          title: form.title,
          description: form.description,
          image: form.image,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock)
        });
      } else {
        await axios.post(API, {
          id: Date.now(),
          title: form.title,
          description: form.description,
          image: form.image,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock)
        });
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title || "",
      description: product.description || "",
      image: product.image || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || ""
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Image URL"
          value={form.image || ""}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category || ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock || ""}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt="product"
            />

            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><b>₹{p.price}</b></p>
            <p>📦 {p.stock} | 🏷️ {p.category}</p>

            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductManager;
