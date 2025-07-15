import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
const API = 'http://localhost:5000/products';


const emptyForm = {
  title: '',
  description: '',
  image: '',
  price: '',
  category: '',
  stock: ''
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`${API}/${editing.id}`, form);
    } else {
      await axios.post(API, { ...form, id: Date.now() });
    }
    setForm(emptyForm);
    setEditing(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(product);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input name="title" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input name="description" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input name="category" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">{editing ? 'Update' : 'Add'} Product</button>
      </form>

      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
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
