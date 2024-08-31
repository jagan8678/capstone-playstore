const express = require('express');
const { createNotification, getNotificationsByApplicationId } = require('../controllers/notificationControoler');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes
router.post('/create/:id', protect, admin, createNotification); // Create notification for application with ID

router.get('/application/:id', protect, getNotificationsByApplicationId); // Get notifications for a specific application

module.exports = router;
