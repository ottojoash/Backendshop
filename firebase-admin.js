const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Update with the path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'photos-9a030.appspot.com' // Update with your Firebase storage bucket
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
