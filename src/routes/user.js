const express = require('express');
const router = express.Router();
const { getUserProfile, getAllProfiles } = require('../controllers/user');

// Route to get a user's profile by ID
router.get('/profile/:userId', getUserProfile);

// Route to get all user profiles
router.get('/profiles', getAllProfiles);

module.exports = router;
