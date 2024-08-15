require('dotenv').config(); // Load environment variables

const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

// Multer configuration for handling multiple files
const storage = multer.memoryStorage(); // Use memoryStorage for file buffer
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // Accept only certain file types
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).array('images', 10); // Handle up to 10 files with the field name 'images'

// Middleware function to upload files to Firebase Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(); // Proceed if no files are provided
  }

  try {
    // Process each file in the `req.files` array
    const uploadPromises = req.files.map(async (file) => {
      const { buffer, originalname } = file;
      const fileRef = bucket.file(originalname);

      // Upload file to Firebase Storage
      await fileRef.save(buffer, {
        metadata: { contentType: file.mimetype },
      });

      // Make file publicly accessible
      await fileRef.makePublic();

      // Get file's public URL
      return `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${originalname}`;
    });

    // Wait for all files to be uploaded
    const fileUrls = await Promise.all(uploadPromises);
    
    // Add file URLs to the request object
    req.filesFirebaseUrls = fileUrls;
    next();
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    res.status(500).send('Error uploading files');
  }
};

module.exports = { upload, uploadToFirebase };
