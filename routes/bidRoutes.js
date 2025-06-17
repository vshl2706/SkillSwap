import express from 'express';
import {placeBid, getAllBidsForJob, acceptBid, rejectBid, getMyBids, getAcceptedBids, submitDelivery} from '../controllers/bidController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

// Freelancers can place a bid
router.get('/my-bids', protect, authorizeRoles('freelancer'), getMyBids);

router.post('/jobId/:jobId', protect, authorizeRoles('freelancer'), placeBid);

// // View all bids on a specific job
router.get('/jobId/:jobId', protect, authorizeRoles('client'), getAllBidsForJob);

// // Accept a bid (client only)
router.put('/accept/:bidId', protect, authorizeRoles('client'), acceptBid);

// // reject a bid (client only)
router.put('/reject/:bidId', protect, authorizeRoles('client'), rejectBid);


router.get('/accepted', protect, authorizeRoles('freelancer'), getAcceptedBids);

router.post('/:bidId/deliver', protect, authorizeRoles('freelancer'), submitDelivery);

export default router;
