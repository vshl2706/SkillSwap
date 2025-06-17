import express from 'express';
import {leaveReview} from '../controllers/reviewController.js';
import protect from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/:jobId', protect, authorizeRoles('client'), leaveReview);

export default router;