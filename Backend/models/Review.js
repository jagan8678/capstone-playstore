const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    applicationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Application', 
        required: true 
    },
    comment: {
        type: String,
        minlength: [5, 'Comment must be at least 5 characters long'],
        maxlength: [50, 'Comment cannot exceed 50  characters'],
        required: [true]
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
