import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['client', 'freelancer', 'admin'],
        default: 'freelancer'
    },
    bio: {
        type: String,
    },
    skills: {
        type: [String],
    },
}, {timestamps: true})

// Hash password before storing it to database
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();  
});

// Custom method to compare the entered password with the hashed one
UserSchema.methods.matchPassword = function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password);
};
 
export default mongoose.model('User', UserSchema);