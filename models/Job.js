import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        skillsRequired: {
            type: [String],
            required: true,
        },
        deadline: {
            type: Date,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['open', 'closed'],
            default: 'open',
        },
        delivery: {
            type: String,
            default: '',
        },
        deliveryStatus: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    {timestamps: true}
);

export default mongoose.model('Job', jobSchema);