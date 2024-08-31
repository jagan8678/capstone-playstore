const Review = require('../models/Review');
const Application = require('../models/Application');

// Add a review (Users only)
exports.addReview = async (req, res) => {
    const { applicationId, comment,  } = req.body;
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Admins are not allowed to add the reviews for the application' });
        }
        //create review
        const review = new Review({
            userId: req.user._id,
            applicationId,
            comment,
            
        });
        await review.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};



//get reviews (admin & who created the app)
exports.getReviews = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const application = await Application.findById(applicationId).populate('user');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (req.user.role === 'admin' && req.user._id.equals(application.user._id)) {
            const reviews = await Review.find({ applicationId }).populate('userId', 'username');
            return res.json(reviews);
        } else {
            return res.status(403).json({ message: 'Not authorized to view these reviews' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};





