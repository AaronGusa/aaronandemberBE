require('dotenv').config();
const admin = require('firebase-admin');


admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure newlines are handled correctly
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    }),
  });


// Middleware to verify Firebase ID token
async function proveFirebaseToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
        // console.log('entered not token?')
      return res.status(401).send('Unauthorized');
    }
    try {
    //   console.log('Entered Try')
      const decodedToken = await admin.auth().verifyIdToken(token);
    //   console.log(decodedToken);
      req.isAuthenticated = true;
      req.user = decodedToken;
      next();
    } catch (error) {
    //   console.log('Entered Error')
      req.isAuthenticated = false;
      res.status(401).send('Invalid token');
    }
  }
  
  module.exports = { proveFirebaseToken };