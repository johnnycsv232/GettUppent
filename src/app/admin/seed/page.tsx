'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { Loader2, Database, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { PricingTier, PortfolioItem, HeroSection } from '@/types/content';

// --- STATIC DATA EXTRACTION ---
const HERO_DATA: HeroSection = {
    headline: "OWN THE NIGHT",
    subheadline: "We don't just post. We pack venues.\nEnergy. Consistency. Measurable Results.",
    ctaText: "Start The Pilot",
    ctaLink: "#pilot"
};

const PRICING_DATA: PricingTier[] = [
    {
        id: "tier1",
        name: "The Opener",
        price: 445,
        description: "Consistent weekly presence.",
        features: ["1 On-Site Shoot", "30 Edited Photos", "72h Delivery", "Standard Licensing"],
        ctaText: "Select Tier",
        isPopular: false
    },
    {
        id: "tier2",
        name: "The Headliner",
        price: 695,
        description: "Growth & video dominance.",
        features: ["2 On-Site Shoots", "60 Edited Photos", "2 High-End Reels", "48h Delivery", "Route-Batched Priority"],
        ctaText: "Select Tier",
        isPopular: true
    },
    {
        id: "tier3",
        name: "VIP Partner",
        price: 995,
        description: "Maximum volume & speed.",
        features: ["3 On-Site Shoots", "80 Edited Photos", "3 High-End Reels", "24-48h Delivery", "Monthly Strategy Call"],
        ctaText: "Select Tier",
        isPopular: false
    }
];

const PORTFOLIO_DATA: PortfolioItem[] = [
    { id: "p1", type: 'video', src: '/placeholder-1.jpg', title: 'Neon Nights', category: 'Event' },
    { id: "p2", type: 'image', src: '/placeholder-2.jpg', title: 'VIP Lounge', category: 'Venue' },
    { id: "p3", type: 'video', src: '/placeholder-3.jpg', title: 'Summer Series', category: 'Festival' },
    { id: "p4", type: 'image', src: '/placeholder-4.jpg', title: 'Bottle Service', category: 'Product' },
    { id: "p5", type: 'image', src: '/placeholder-5.jpg', title: 'DJ Set', category: 'Artist' },
    { id: "p6", type: 'video', src: '/placeholder-6.jpg', title: 'Grand Opening', category: 'Event' },
] as any; // Cast to any to handle the 'type' field which isn't in our strict interface yet but needed for UI

export default function SeedPage() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    const handleMigration = async () => {
        if (!confirm("WARNING: This will overwrite existing content in the 'site_content' collection. Are you sure?")) return;

        setLoading(true);
        setLogs([]);
        setCompleted(false);
        addLog("🚀 Starting migration...");

        try {
            const batch = writeBatch(db);

            // 1. Hero Section
            const heroRef = doc(db, 'site_content', 'hero');
            batch.set(heroRef, HERO_DATA, { merge: true });
            addLog("📝 Staged 'hero' document");

            // 2. Pricing Tiers
            const pricingRef = doc(db, 'site_content', 'pricing');
            batch.set(pricingRef, { tiers: PRICING_DATA }, { merge: true });
            addLog("💰 Staged 'pricing' document");

            // 3. Portfolio
            const portfolioRef = doc(db, 'site_content', 'portfolio');
            batch.set(portfolioRef, { items: PORTFOLIO_DATA }, { merge: true });
            addLog("📸 Staged 'portfolio' document");

            // Commit Batch
            addLog("💾 Committing changes to Firestore...");
            await batch.commit();

            addLog("✅ MIGRATION COMPLETE!");
            setCompleted(true);
        } catch (error: any) {
            console.error(error);
            addLog(`❌ ERROR: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                    <Database className="h-8 w-8 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">Database Migration</h1>
                    <p className="text-gray-400">Seed Firestore with static content from the codebase.</p>
                </div>
            </div>

            <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-red-400">Warning: Destructive Action</h3>
                        <p className="text-gray-300 leading-relaxed">
                            This tool will overwrite the <code>site_content</code> collection in your Firestore database.
                            It uses <code>merge: true</code>, so existing fields will be updated, but it is still a destructive operation.
                            <br /><br />
                            <strong>Target Collection:</strong> <code>site_content</code><br />
                            <strong>Documents:</strong> <code>hero</code>, <code>pricing</code>, <code>portfolio</code>
                        </p>

                        <button
                            onClick={handleMigration}
                            disabled={loading}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Database className="h-5 w-5" />}
                            {loading ? 'Migrating...' : 'Start Migration'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Logs Console */}
            <div className="bg-black border border-white/10 rounded-2xl overflow-hidden font-mono text-sm shadow-2xl">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Migration Logs</span>
                </div>
                <div className="p-4 h-64 overflow-y-auto space-y-2">
                    {logs.length === 0 && <span className="text-gray-700 italic">Ready to start...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className={`${log.includes('ERROR') ? 'text-red-400' : log.includes('COMPLETE') ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
