import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// 🔐 SECURITY: Server-side Firebase Admin SDK initialization
// Uses service account credentials (never exposed to client)

function getRequiredServerEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`🔴 SERVER ENV MISSING: ${key} is required for Firebase Admin. Add it to Vercel Environment Variables.`);
    }
    return value;
}

let adminApp: App;

function getAdminApp(): App {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    // Parse the private key (it comes as a string with escaped newlines)
    const privateKey = getRequiredServerEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

    adminApp = initializeApp({
        credential: cert({
            projectId: getRequiredServerEnv('FIREBASE_PROJECT_ID'),
            clientEmail: getRequiredServerEnv('FIREBASE_CLIENT_EMAIL'),
            privateKey: privateKey,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    return adminApp;
}

// Export initialized services
export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());
