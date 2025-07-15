const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../models/db.json');

function readData() {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read JSON:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

exports.addProduct = (req, res) => {
  const products = readData();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = readData();
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
  let products = readData();
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  writeData(products);
  res.status(204).send();
};
