'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

// Check if Firebase is configured
const isFirebaseConfigured = () => {
    return typeof window !== 'undefined' && 
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'YOUR_FIREBASE_API_KEY';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isFirebaseConfigured()) {
            // Firebase not configured, skip auth
            setLoading(false);
            return;
        }

        let unsubscribe: (() => void) | undefined;

        const initAuth = async () => {
            try {
                const { auth } = await import('@/lib/firebase');
                const { onAuthStateChanged } = await import('firebase/auth');
                
                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
            } catch (error) {
                console.error('Error initializing auth:', error);
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const signOut = async () => {
        if (!isFirebaseConfigured()) {
            router.push('/login');
            return;
        }

        try {
            const { auth } = await import('@/lib/firebase');
            const { signOut: firebaseSignOut } = await import('firebase/auth');
            await firebaseSignOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
