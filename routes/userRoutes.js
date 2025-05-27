import express from 'express';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';
import { getProfile, updateProfile, getAllUsers} from '../controllers/userController.js';

const router = express.Router();

// Protected Route
router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);
router.get('/',protect, authorizeRoles('admin'), getAllUsers);

export default router;