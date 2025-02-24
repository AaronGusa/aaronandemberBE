const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

// Middleware to verify Firebase ID token
async function proveFirebaseToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        console.log('entered not token?')
      return res.status(401).send('Unauthorized');
    }
    try {
      console.log('Entered Try')
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken);
      req.isAuthenticated = true;
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log('Entered Error')
      req.isAuthenticated = false;
      res.status(401).send('Invalid token');
    }
  }
  
  module.exports = { proveFirebaseToken };