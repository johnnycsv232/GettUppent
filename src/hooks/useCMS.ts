'use client';

import { useState, useEffect } from 'react';
import { 
    SiteContent, 
    HeroSection, 
    PricingTier, 
    PortfolioItem,
    DEFAULT_HERO,
    DEFAULT_PRICING,
    DEFAULT_PORTFOLIO,
    DEFAULT_TESTIMONIALS,
    DEFAULT_PILOT_OFFER,
    DEFAULT_FOUNDER,
    DEFAULT_SHOTCLOCK,
    DEFAULT_ROI_MATH,
    DEFAULT_EDITING_SERVICE,
} from '@/types/content';

export function useCMS() {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContent() {
            // Check if Firebase is configured
            const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'YOUR_FIREBASE_API_KEY';

            if (!isFirebaseConfigured) {
                // Use fallback data when Firebase is not configured
                console.log("Firebase not configured, using fallback data");
                setContent({
                    hero: DEFAULT_HERO,
                    roiMath: DEFAULT_ROI_MATH,
                    founder: DEFAULT_FOUNDER,
                    shotClock: DEFAULT_SHOTCLOCK,
                    testimonials: DEFAULT_TESTIMONIALS,
                    pilotOffer: DEFAULT_PILOT_OFFER,
                    pricing: DEFAULT_PRICING,
                    editingService: DEFAULT_EDITING_SERVICE,
                    portfolio: DEFAULT_PORTFOLIO,
                    features: []
                });
                setLoading(false);
                return;
            }

            try {
                // Dynamic import to avoid initialization errors when not configured
                const { db } = await import('@/lib/firebase');
                const { doc, getDoc } = await import('firebase/firestore');

                // Fetch all singleton documents in parallel
                const [heroSnap, pricingSnap, portfolioSnap] = await Promise.all([
                    getDoc(doc(db, 'site_content', 'hero')),
                    getDoc(doc(db, 'site_content', 'pricing')),
                    getDoc(doc(db, 'site_content', 'portfolio'))
                ]);

                const hero = heroSnap.exists() ? heroSnap.data() as HeroSection : DEFAULT_HERO;
                const pricing = pricingSnap.exists() ? (pricingSnap.data().tiers as PricingTier[]) : DEFAULT_PRICING;
                const portfolio = portfolioSnap.exists() ? (portfolioSnap.data().items as PortfolioItem[]) : DEFAULT_PORTFOLIO;

                setContent({
                    hero,
                    pricing,
                    portfolio,
                    features: []
                });
            } catch (err: any) {
                console.error("Error fetching CMS content, using fallback:", err);
                setError(err.message);
                // Use fallback data on error
                setContent({
                    hero: DEFAULT_HERO,
                    roiMath: DEFAULT_ROI_MATH,
                    founder: DEFAULT_FOUNDER,
                    shotClock: DEFAULT_SHOTCLOCK,
                    testimonials: DEFAULT_TESTIMONIALS,
                    pilotOffer: DEFAULT_PILOT_OFFER,
                    pricing: DEFAULT_PRICING,
                    editingService: DEFAULT_EDITING_SERVICE,
                    portfolio: DEFAULT_PORTFOLIO,
                    features: []
                });
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    return { content, loading, error };
}
