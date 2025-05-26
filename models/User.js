const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['learner', 'teacher', 'both'],
        default: 'learner'
    }
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

module.exports = mongoose.model('User', UserSchema);