const admin = require('firebase-admin');

// Middleware to verify Firebase ID token
async function proveFirebaseToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.isAuthenticated = true;
      req.user = decodedToken;
      next();
    } catch (error) {
      req.isAuthenticated = false;
      res.status(401).send('Invalid token');
    }
  }
  
  module.exports = { proveFirebaseToken };