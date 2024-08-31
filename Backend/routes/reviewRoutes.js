const express = require('express');
const {
    addReview,
    getReviews
} = require('../controllers/reviewController');
const { protect,admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Add a review (Users only)
router.post('/addreview', protect, addReview);

// Get reviews ( Admin)
router.get('/:applicationId', protect,admin, getReviews);

module.exports = router;
