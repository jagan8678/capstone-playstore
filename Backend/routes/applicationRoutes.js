const express = require('express');
const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getAppByName,
    getAppsByCategory,
    getAppsByRatings,
    updateVisibility,
    DownloadCount,
    Download,
    
  
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();


// Routes for both user and admin
router.get('/', protect, getApplications);   //get all applications list
router.get('/:id', protect, getApplicationById);//get particular application by id
router.get('/name/:name', protect, getAppByName); //get particular application by name
router.get('/category/:category', protect, getAppsByCategory);  //get particular application by category
router.get('/ratings/:ratings', protect, getAppsByRatings);     //get particular application by ratings


//Route for user only
router.put('/download/:id', protect, Download);   

// Routes for only admin
router.post('/create/', protect, admin, createApplication);   // create new application
router.put('/update/:id', protect, admin, updateApplication);  //update new application
router.delete('/delete/:id', protect, admin, deleteApplication); // delete existing application
router.put('/:id/visibility', protect, admin, updateVisibility);  //update visibility 
router.get('/download-count/:id', protect, admin, DownloadCount);    // get the download count




module.exports = router;

