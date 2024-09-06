import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Use 'require' for JSON import
const serviceAccountKey = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);
export default auth;

