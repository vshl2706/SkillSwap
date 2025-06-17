import Review from '../models/Review.js';
import Job from '../models/Job.js';
import Bid from '../models/Bid.js';

export const leaveReview = async (req, res) => {
    const {jobId} = req.params;
    const {rating, feedback} = req.body;

    try {
        const job = await Job.findById(jobId)

        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        if(job.client.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'only the client can leave a review'});
        }

        // Check if already reviewed
        const existingReview = await Review.findOne({job: jobId});
        if(existingReview){
            return res.status(400).json({message: 'Job already reviewed'});
        }

        // Find accepted bid to get freelancer
        const acceptedBid = await Bid.findOne({job: jobId, status: 'accepted'});

        if(!acceptedBid){
            return res.status(400).json({message: 'No accepted bid found for this job'});
        }
        const review = await Review.create({
            job: job._id,
            client: req.user._id,
            freelancer: acceptedBid.freelancer,
            rating,
            feedback,
        });

        await review.save();
        res.status(201).json({message: 'Review submitted successfully', review});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error submitting review', error: err.message});
    }
};