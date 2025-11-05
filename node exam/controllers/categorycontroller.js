// controllers/categoryController.js
import Category from '../models/category.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'name required' });
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Category exists' });
    const cat = new Category({ name });
    await cat.save();
    res.status(201).json({ message: 'Category created', category: cat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await Category.findById(id);
    if (!cat) return res.status(404).json({ message: 'Not found' });
    cat.name = req.body.name || cat.name;
    await cat.save();
    res.json({ message: 'Updated', category: cat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
