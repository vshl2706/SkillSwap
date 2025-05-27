import express from 'express';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';
import { getProfile, updateProfile, getAllUsers, deleteUser, getUserById, updateUserRole} from '../controllers/userController.js';

const router = express.Router();

// Protected Route
router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);
router.get('/',protect, authorizeRoles('admin'),getAllUsers);
router.get('/:id',protect,authorizeRoles('admin'),getUserById);
router.delete('/:id',protect, authorizeRoles('admin'),deleteUser);
router.put('/:id',protect, authorizeRoles('admin'),updateUserRole);

export default router;