'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SiteContent, HeroSection, PricingTier, PortfolioItem } from '@/types/content';

// Default fallback data in case DB is empty or fails
const DEFAULT_HERO: HeroSection = {
    headline: "OWN THE NIGHT",
    subheadline: "We don't just post. We pack venues.\nEnergy. Consistency. Measurable Results.",
    ctaText: "Start The Pilot",
    ctaLink: "#pilot"
};

export function useCMS() {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContent() {
            try {
                // Fetch all singleton documents in parallel
                const [heroSnap, pricingSnap, portfolioSnap] = await Promise.all([
                    getDoc(doc(db, 'site_content', 'hero')),
                    getDoc(doc(db, 'site_content', 'pricing')),
                    getDoc(doc(db, 'site_content', 'portfolio'))
                ]);

                const hero = heroSnap.exists() ? heroSnap.data() as HeroSection : DEFAULT_HERO;
                const pricing = pricingSnap.exists() ? (pricingSnap.data().tiers as PricingTier[]) : [];
                const portfolio = portfolioSnap.exists() ? (portfolioSnap.data().items as PortfolioItem[]) : [];

                setContent({
                    hero,
                    pricing,
                    portfolio,
                    features: [] // Placeholder if needed later
                });
            } catch (err: any) {
                console.error("Error fetching CMS content:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    return { content, loading, error };
}
