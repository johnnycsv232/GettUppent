'use client';

import { useState, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, UserPlus, AlertCircle, Crown, ArrowRight } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            setIsLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/portal');
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password is too weak. Use at least 6 characters.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080808]">
            <PublicHeader />
            
            <div className="flex items-center justify-center min-h-[80vh] p-6">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-pink/10 mb-4">
                        <Crown className="h-8 w-8 text-brand-pink" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Get Started
                    </h1>
                    <p className="text-gray-500 mt-2">Create your GettUpp account</p>
                </div>

                {/* Register Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 text-red-400 text-sm">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                                placeholder="••••••••••••••••"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                                placeholder="••••••••••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full bg-brand-pink hover:bg-white hover:text-black text-white font-bold py-3.5 uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-brand-gold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-xs mt-8">
                    &copy; {new Date().getFullYear()} GettUpp ENT. All rights reserved.
                </p>
            </div>
            </div>
        </main>
    );
}
