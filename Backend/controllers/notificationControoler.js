const Notification = require('../models/Notification');
const Application = require('../models/Application');

// Create a notification for a specific application (Admin & Application Owners)
exports.createNotification = async (req, res) => {
    try {
        const applicationId = req.params.id; // Get the application ID from URL
        const { message } = req.body;

        // Ensure the user is an admin or the owner of the application
        if (req.user.role !== 'admin') {
            const application = await Application.findById(applicationId);
            if (!application || application.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to create notification for this application' });
            }
        }

        // Create and save the notification
        const notification = new Notification({
            application: applicationId,
            message
        });

        await notification.save();
        res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (error) {
        console.error('Create Notification Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get notifications for a specific application
exports.getNotificationsByApplicationId = async (req, res) => {
    try {
        const applicationId = req.params.id; // Get the application ID from URL

        const notifications = await Notification.find({ application: applicationId }).populate('user', 'name').populate('application', 'name');
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this application' });
        }
        res.json(notifications);
    } catch (error) {
        console.error('Get Notifications Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

