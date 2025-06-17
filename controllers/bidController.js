import Bid from '../models/Bid.js';
import Job from '../models/Job.js';

export const placeBid = async (req, res) => {
    try {
        const {jobId} = req.params;
        const {proposal, bidAmount} = req.body;

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        const bid = new Bid({
            job: jobId,
            freelancer: req.user._id,
            proposal,
            bidAmount,
        });

        await bid.save();
        res.status(201).json({message: 'Bid placed successfully', bid});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error placing bid', error: err.message});
    }
};

export const getAllBidsForJob = async (req, res) => {
    try {
        const {jobId} = req.params;
        const bids = await Bid.find({job: jobId}).populate('freelancer', 'name email');
        res.status(200).json({bids});
    } catch (error) {
        console.error(err);
        res.status(500).json({message: 'Error fetching bids', error:err.message});
    }
};

export const acceptBid = async (req, res) => {
    try {
        const {bidId} = req.params;
        
        const bid = await Bid.findById(bidId).populate('job');
        if(!bid) return res.status(404).json({message: 'Bid not found'});

        // Ensure client owns the job
        if(bid.job.client.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Unauthorized'});
        }

        // Mark all other bids as rejected
        await Bid.updateMany({job: bid.job._id, id:{$ne: bidId}}, {status: 'rejected'});
        
        bid.status = 'accepted';
        await bid.save();
        
        res.status(200).json({message: 'Bid accepted successfully', bid});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error accepting bid', error: err.message});
    }
};

export const rejectBid = async(req, res) => {
    try {
        const {bidId} = req.params;

        const bid = await Bid.findById(bidId).populate('job');
        if(!bid) return res.status(404).json({message: 'Bid not found'});

        // Ensure client owns the job
        if(bid.job.client.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Unauthorized'});
        }

        bid.status = 'rejected';
        await bid.save();

        res.status(200).json({message: 'Bid rejected successfully', bid});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error rejecting bid', error: err.message});
    }
};

export const getMyBids = async (req, res) => {
    console.log("req.user inside getMyBids: ", req.user)
    try {
        const bids = await Bid.find({freelancer: req.user._id}).populate('job', 'title status');
        res.status(200).json({bids});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error fetching bids', error: err.message});
    }
};

export const getAcceptedBids = async(req, res) => {
    try {
        const bids = await Bid.find({
            freelancer: req.user._id,
            status: 'accepted',
        }).populate('job', 'title status');

        res.status(200).json({acceptedJobs: bids});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error fetching accepted jobs'});
    }
};

export const submitDelivery = async (req, res) => {
    const {bidId} = req.params;
    const {delivery} = req.body;

    try {
        const bid = await Bid.findById(bidId);

        if(!bid){
            return res.status(404).json({message: 'Bid not found'});
        }

        console.log('Logged-in user:', req.user._id);
        console.log('Freelancer on this bid:', bid.freelancer);

        if(!bid.freelancer.equals(req.user._id)){
            return res.status(403).json({message: 'Not authorized to deliver this job'});
        }

        if(bid.status !== 'accepted'){
            return res.status(400).json({message: 'Cannot deliver a job that is not accepted'});
        }

        bid.delivery = delivery;
        await bid.save();

        res.status(200).json({message: 'Delivery submitted successfully', bid});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error submitting delivery'});
    }
};