import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
        },
        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        proposal: {
            type: String,
            required: true,
        },
        bidAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
        delivery: {
            type: String,
        },
    },
    {timestamps: true}
);

export default mongoose.model('Bid', bidSchema);
