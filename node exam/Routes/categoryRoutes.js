import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categorycontroller.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories); // public route
router.post('/', verifyToken, authorizeRoles('admin'), createCategory);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateCategory);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteCategory);

export default router;
