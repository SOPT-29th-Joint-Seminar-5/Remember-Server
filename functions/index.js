const admin = require('firebase-admin');
const serviceAccount = require('./sopt-29th-joint-seminar-5-firebase-adminsdk-682bz-12fbfa5958.json');
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
