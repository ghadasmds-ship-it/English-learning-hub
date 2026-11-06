/**
 * Firebase Integration Foundation & Diagnostic Module
 *
 * This platform architecture is built for Google Cloud Firestore and Firebase Auth.
 * When environment variables (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.)
 * are configured, live Cloud Firestore persistence is activated.
 * In development or pilot mode when env vars are unpopulated, the dual-engine storage
 * transparently operates in persistent local mode, ensuring complete pilot testability
 * without broken promises or security bypasses.
 */

export interface FirebaseConnectionStatus {
  isConfigured: boolean;
  projectId?: string;
  authDomain?: string;
  storageBucket?: string;
  mode: 'live_cloud' | 'local_storage_pilot';
  missingEnvVars: string[];
}

export function getFirebaseConnectionStatus(): FirebaseConnectionStatus {
  const env = (import.meta as any).env || {};
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missing = requiredVars.filter(key => !env[key]);
  const isConfigured = missing.length === 0;

  return {
    isConfigured,
    projectId: env.VITE_FIREBASE_PROJECT_ID || undefined,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || undefined,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
    mode: isConfigured ? 'live_cloud' : 'local_storage_pilot',
    missingEnvVars: missing
  };
}

export const firebaseConfigTemplate = `
# Firebase Configuration Instructions
To connect live Firebase Cloud Firestore & Auth:
1. Create a Firebase project in Google Cloud Console.
2. Enable Email/Password in Firebase Authentication.
3. Enable Cloud Firestore in Production Mode.
4. Deploy the provided firestore.rules file using Firebase CLI:
   firebase deploy --only firestore:rules
5. Add the following environment variables to your deployment (.env):
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
`;
