'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Settings, User, Bell, Shield, Save, Loader2, CheckCircle } from 'lucide-react';

interface UserPreferences {
    notifications: {
        newLeads: boolean;
        statusChanges: boolean;
        weeklyDigest: boolean;
    };
    display: {
        defaultLeadStatus: string;
        itemsPerPage: number;
    };
}

const DEFAULT_PREFERENCES: UserPreferences = {
    notifications: {
        newLeads: true,
        statusChanges: true,
        weeklyDigest: false,
    },
    display: {
        defaultLeadStatus: 'Pending',
        itemsPerPage: 25,
    },
};

const LEAD_STATUSES = ['Pending', 'Contacted', 'Qualified', 'Booked', 'Declined'];

export default function SettingsPage() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Load preferences
    useEffect(() => {
        async function loadPreferences() {
            if (!user) return;
            
            try {
                const docRef = doc(db, 'user_preferences', user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setPreferences({ ...DEFAULT_PREFERENCES, ...docSnap.data() } as UserPreferences);
                }
            } catch (error) {
                console.error('Error loading preferences:', error);
            } finally {
                setLoading(false);
            }
        }
        
        loadPreferences();
    }, [user]);

    // Save preferences
    const handleSave = async () => {
        if (!user) return;
        
        setSaving(true);
        try {
            const docRef = doc(db, 'user_preferences', user.uid);
            await setDoc(docRef, preferences, { merge: true });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : saved ? (
                        <CheckCircle className="h-5 w-5" />
                    ) : (
                        <Save className="h-5 w-5" />
                    )}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {/* Account Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-gold/10 rounded-lg">
                        <User className="h-5 w-5 text-brand-gold" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Account</h2>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                            />
                            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-xs font-bold text-green-500 uppercase">Verified</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Email cannot be changed from this panel</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">User ID</label>
                        <input
                            type="text"
                            value={user?.uid || ''}
                            disabled
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-gray-500 font-mono text-sm cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-pink/10 rounded-lg">
                        <Bell className="h-5 w-5 text-brand-pink" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                </div>
                
                <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-black/20 rounded-xl cursor-pointer hover:bg-black/30 transition-colors">
                        <div>
                            <div className="font-medium text-white">New Lead Alerts</div>
                            <div className="text-sm text-gray-500">Get notified when a new lead comes in</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.notifications.newLeads}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, newLeads: e.target.checked }
                            })}
                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                        />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-black/20 rounded-xl cursor-pointer hover:bg-black/30 transition-colors">
                        <div>
                            <div className="font-medium text-white">Status Changes</div>
                            <div className="text-sm text-gray-500">Notify when lead status changes</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.notifications.statusChanges}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, statusChanges: e.target.checked }
                            })}
                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                        />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-black/20 rounded-xl cursor-pointer hover:bg-black/30 transition-colors">
                        <div>
                            <div className="font-medium text-white">Weekly Digest</div>
                            <div className="text-sm text-gray-500">Receive a weekly summary email</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.notifications.weeklyDigest}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, weeklyDigest: e.target.checked }
                            })}
                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                        />
                    </label>
                </div>
            </div>

            {/* Display Preferences */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Settings className="h-5 w-5 text-purple-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Display Preferences</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Default Lead Status Filter</label>
                        <select
                            value={preferences.display.defaultLeadStatus}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                display: { ...preferences.display, defaultLeadStatus: e.target.value }
                            })}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="All" className="bg-[#111]">All Statuses</option>
                            {LEAD_STATUSES.map(status => (
                                <option key={status} value={status} className="bg-[#111]">{status}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Items Per Page</label>
                        <select
                            value={preferences.display.itemsPerPage}
                            onChange={(e) => setPreferences({
                                ...preferences,
                                display: { ...preferences.display, itemsPerPage: parseInt(e.target.value) }
                            })}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="10" className="bg-[#111]">10</option>
                            <option value="25" className="bg-[#111]">25</option>
                            <option value="50" className="bg-[#111]">50</option>
                            <option value="100" className="bg-[#111]">100</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Security Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Security</h2>
                </div>
                
                <div className="text-sm text-gray-400 space-y-2">
                    <p>• Your session is secured with Firebase Authentication</p>
                    <p>• All data is encrypted in transit and at rest</p>
                    <p>• API routes are protected with token verification</p>
                </div>
            </div>
        </div>
    );
}
