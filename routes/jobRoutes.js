import express from 'express';
import {createJob, reviewDelivery} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js'
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('client'), createJob);

router.put('/:jobId/review', protect, authorizeRoles('client'), reviewDelivery);

export default router;