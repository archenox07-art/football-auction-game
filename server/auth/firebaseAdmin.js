import admin from "firebase-admin";

// 🔐 Service account JSON contents go here
// (download from Firebase Console → Project Settings → Service Accounts)
const serviceAccount = {
  type: "service_account",
  project_id: "auction-app-c7a13",
  private_key_id: "REPLACE_ME",
  private_key: "-----BEGIN PRIVATE KEY-----\nREPLACE_ME\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk@auction-app-c7a13.iam.gserviceaccount.com",
  client_id: "REPLACE_ME",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "REPLACE_ME"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export async function verifyFirebaseToken(token) {
  return await admin.auth().verifyIdToken(token);
}
