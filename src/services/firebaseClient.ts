import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/**
 * Explicit, fail-closed Firebase initialization.
 * This module never falls back to localStorage for authenticated user data.
 * Do not treat the presence of configuration as proof of a working backend.
 */
export interface CloudServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

export function createCloudServices(): CloudServices {
  const env = import.meta.env;
  const keys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID'
  ] as const;
  const missing = keys.filter(key => !env[key]);
  if (missing.length) {
    throw new Error('Firebase is not configured: ' + missing.join(', '));
  }

  const config = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || undefined
  };
  const app = getApps().length ? getApp() : initializeApp(config);
  return { app, auth: getAuth(app), db: getFirestore(app) };
}
