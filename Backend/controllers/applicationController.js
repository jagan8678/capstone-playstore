
const Application = require('../models/Application');

// Get all applications(user amd admin)
exports.getApplications = async (req, res) => {
    try {
        const query = {};
        if (req.user && req.user.role !== 'admin') {
            query.visibility = true;
        }
        // if (req.query.visibility !== undefined) {
        //     query.visibility = req.query.visibility === 'true'; 
        // }
        const applications = await Application.find(query);
        res.json(applications);
    } catch (error) {
        res.status(500).send(error);
    }
};


//Get a specific application by ID (User and Admin)
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findOne({ 
            _id: req.params.id, 
            $or: [
                { visibility: true }, 
                { creatorId: req.user._id } 
            ]
        });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an application by name
exports.getAppByName = async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');
        const query = { name: { $regex: regex } };
        if (req.user && req.user.role !== 'admin') {
            query.visibility = true;
        }
        const apps = await Application.find(query);
        if (!apps.length) return res.status(404).json({ message: 'No apps  found for  this name' });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get Applications By Category
exports.getAppsByCategory = async (req, res) => {
    try {
        const query = { category: req.params.category };
        if (req.user && req.user.role !== 'admin') {
            query.visibility = true;
        }
        const apps = await Application.find(query);
        if (!apps.length) return res.status(404).json({ message: 'No apps found for this category' });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


//get application by rating 
exports.getAppsByRatings = async (req, res) => {
    try {
        const query = { ratings: { $eq: req.params.ratings } };

        // Apply visibility filter for non-admin users
        if (req.user && req.user.role !== 'admin') {
            query.visibility = true;
        }

        const apps = await Application.find(query);
        if (!apps.length) return res.status(404).json({ message: 'No apps found with this rating' });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};





// Create a new application (Admin Only)
exports.createApplication = async (req, res) => {
    try {
        const newApplication = new Application({
            ...req.body,
            user: req.user._id  
        });
        const saveApplication = await newApplication.save();
        res.status(201).json({ message: 'New Application created Successfully', saveApplication });
    } catch (error) {
        console.error('Create Application Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update an existing application by ID (Admin & owner of the application Only)
exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        // check user is owner of the app
        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this application  You are not the owner of this application' });
        }
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json({ message: 'Application updated', updatedApplication });
    } catch (error) {
        console.error('Update Application Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




// Delete an application by ID (Admin & owner of the app Only)
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        // check user is owner of the app
        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this application  You are not the owner of this application' });
        }
        await Application.findByIdAndDelete(req.params.id);
        res.json({ message: 'Application deleted' });
    } catch (error) {
        console.error('Delete Application Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// put an application by id for visibility
exports.updateVisibility = async (req, res) => {
    try {
        const { visibility } = req.body;
        if (typeof visibility !== 'boolean') {
            return res.status(400).json({ message: 'Invalid visibility value' });
        }
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        //// check user is owner of the app
        if (application.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update the visibility of  this application' });
        }
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { visibility: visibility },
            { new: true }
        );
        res.json({ message: 'Application visibility updated', application: updatedApplication });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


//download  count(admin only)

exports.DownloadCount = async (req, res) => {
    try {
        const applicationId = req.params.id;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).send('Application not found');
        }
        // check user is owner of the app
        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('Access denied: You are not the owner of this application');
        }
        res.json({
            appId: application._id,
            appName: application.name,
            downloads: application.downloads
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// download application (user only )

exports.Download = async (req, res) => {
    try {
        if (req.user && req.user.role === 'admin') {
            return res.status(403).json({ message: 'Access denied for admins' });
        }
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).send('Application not found');
        }
        application.downloads += 1;
        await application.save();
        res.json({
            message: 'Application Download Successfully',
            appId: application._id,
            appName: application.name,
            downloads: application.downloads
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


