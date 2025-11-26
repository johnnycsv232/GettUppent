const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function createAdmin() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
        });
    }

    const email = 'admin@gettuppent.com';
    const password = 'password123';

    try {
        const user = await admin.auth().getUserByEmail(email);
        console.log('User already exists:', user.uid);
        // Update password just in case
        await admin.auth().updateUser(user.uid, { password });
        console.log('Password updated.');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            const user = await admin.auth().createUser({
                email,
                password,
                emailVerified: true,
            });
            console.log('User created:', user.uid);
        } else {
            console.error('Error:', error);
        }
    }
}

createAdmin();
