const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../../firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

// Multer configuration
const storage = multer.memoryStorage(); // Use memoryStorage for file buffer

const upload = multer({ storage });

// Middleware function to upload file to Firebase Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return next(); // Proceed if no file is provided
  }
  
  try {
    const { buffer, originalname } = req.file;
    const file = bucket.file(originalname);

    // Upload file to Firebase Storage
    await file.save(buffer, {
      metadata: { contentType: req.file.mimetype },
      public: true // Set public access if needed
    });

    // Get file's public URL
    req.file.firebaseUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${originalname}`;
    next();
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    res.status(500).send('Error uploading file');
  }
};

module.exports = { upload, uploadToFirebase };
