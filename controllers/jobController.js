import Job from '../models/Job.js';

export const createJob = async (req, res) => {
    try {
        const { title, description, budget, skillsRequired, deadline } = req.body;

        // Validate required fields
        if (!title || !description || !budget || !skillsRequired || !deadline) {
        return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const newJob = new Job({
            title,
            description,
            budget,
            skillsRequired,
            deadline,
            client: req.user._id,   // from auth middleware;
        });
        
        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', newJob });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error posting job', error: error.message});
    }
};

export const reviewDelivery = async (req, res) => {
    const {jobId} = req.params;
    const {action} = req.body; 

    try {
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        // Check if current user is the client who posted the job
        if(job.client.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Not authorized to review this job'});
        }

        if(action === 'accept'){
            job.status = 'closed';
        } else if(action === 'reject'){
            job.status = 'open';
        } else {
            return res.status(400).json({message: 'Invalid action'});
        }

        await job.save();
        res.status(200).json({message: `Delivery ${action}ed`, job});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error reviewing delivery', error: err.message});
    }
};