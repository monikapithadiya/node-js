const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../models/db.json");

// Read JSON
function readData() {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Read error:", err);
    return [];
  }
}

// Write JSON
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Write error:", err);
  }
}

exports.getProducts = (req, res) => {
  const data = readData();
  res.json(data);
};

exports.addProduct = (req, res) => {
  try {
    const data = readData();

    const newProduct = {
      id: req.body.id || Date.now(),
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
    };

    data.push(newProduct);
    writeData(data);

    res.status(201).json({
      message: "Product added successfully",
      newProduct,
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const data = readData();
    const id = req.params.id;

    const index = data.findIndex((item) => String(item.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    data[index] = { ...data[index], ...req.body };
    writeData(data);

    res.json({
      message: "Product updated successfully",
      updated: data[index],
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const data = readData();
    const id = req.params.id;

    const filtered = data.filter((item) => String(item.id) !== String(id));
    writeData(filtered);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
