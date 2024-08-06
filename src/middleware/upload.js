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
    });

    // Make file publicly accessible
    await file.makePublic();

    // Get file's public URL
    req.file.firebaseUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${originalname}`;
    next();
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    res.status(500).send('Error uploading file');
  }
};

module.exports = { upload, uploadToFirebase };
