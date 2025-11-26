'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Save, Loader2, CheckCircle, AlertCircle, Plus, Trash2, Star } from 'lucide-react';
import { HeroSection, PricingTier, PortfolioItem } from '@/types/content';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    onSave: () => Promise<void>;
    saveStatus: SaveStatus;
}

function Section({ title, children, onSave, saveStatus }: SectionProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <button
                    onClick={onSave}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
                >
                    {saveStatus === 'saving' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : saveStatus === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                    ) : saveStatus === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save'}
                </button>
            </div>
            {children}
        </div>
    );
}

export default function ContentPage() {
    const [loading, setLoading] = useState(true);
    const [hero, setHero] = useState<HeroSection>({
        headline: '',
        subheadline: '',
        ctaText: '',
        ctaLink: ''
    });
    const [pricing, setPricing] = useState<PricingTier[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

    const [heroStatus, setHeroStatus] = useState<SaveStatus>('idle');
    const [pricingStatus, setPricingStatus] = useState<SaveStatus>('idle');
    const [portfolioStatus, setPortfolioStatus] = useState<SaveStatus>('idle');

    // Load content from Firestore
    useEffect(() => {
        async function loadContent() {
            try {
                const [heroSnap, pricingSnap, portfolioSnap] = await Promise.all([
                    getDoc(doc(db, 'site_content', 'hero')),
                    getDoc(doc(db, 'site_content', 'pricing')),
                    getDoc(doc(db, 'site_content', 'portfolio'))
                ]);

                if (heroSnap.exists()) {
                    setHero(heroSnap.data() as HeroSection);
                }
                if (pricingSnap.exists()) {
                    setPricing((pricingSnap.data().tiers || []) as PricingTier[]);
                }
                if (portfolioSnap.exists()) {
                    setPortfolio((portfolioSnap.data().items || []) as PortfolioItem[]);
                }
            } catch (error) {
                console.error('Error loading content:', error);
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, []);

    // Save handlers
    const saveHero = async () => {
        setHeroStatus('saving');
        try {
            await updateDoc(doc(db, 'site_content', 'hero'), { ...hero });
            setHeroStatus('success');
            setTimeout(() => setHeroStatus('idle'), 2000);
        } catch (error) {
            console.error('Error saving hero:', error);
            setHeroStatus('error');
        }
    };

    const savePricing = async () => {
        setPricingStatus('saving');
        try {
            await updateDoc(doc(db, 'site_content', 'pricing'), { tiers: pricing });
            setPricingStatus('success');
            setTimeout(() => setPricingStatus('idle'), 2000);
        } catch (error) {
            console.error('Error saving pricing:', error);
            setPricingStatus('error');
        }
    };

    const savePortfolio = async () => {
        setPortfolioStatus('saving');
        try {
            await updateDoc(doc(db, 'site_content', 'portfolio'), { items: portfolio });
            setPortfolioStatus('success');
            setTimeout(() => setPortfolioStatus('idle'), 2000);
        } catch (error) {
            console.error('Error saving portfolio:', error);
            setPortfolioStatus('error');
        }
    };

    // Pricing tier handlers
    const addTier = () => {
        const newTier: PricingTier = {
            id: `tier_${Date.now()}`,
            name: 'New Tier',
            price: 0,
            description: '',
            features: [],
            ctaText: 'Select',
            isPopular: false
        };
        setPricing([...pricing, newTier]);
    };

    const updateTier = (index: number, updates: Partial<PricingTier>) => {
        const newPricing = [...pricing];
        newPricing[index] = { ...newPricing[index], ...updates };
        setPricing(newPricing);
    };

    const removeTier = (index: number) => {
        if (confirm('Remove this pricing tier?')) {
            setPricing(pricing.filter((_, i) => i !== index));
        }
    };

    // Portfolio item handlers
    const addPortfolioItem = () => {
        const newItem: PortfolioItem = {
            id: `portfolio_${Date.now()}`,
            title: 'New Item',
            category: 'Event',
            imageUrl: '/placeholder.jpg'
        };
        setPortfolio([...portfolio, newItem]);
    };

    const updatePortfolioItem = (index: number, updates: Partial<PortfolioItem>) => {
        const newPortfolio = [...portfolio];
        newPortfolio[index] = { ...newPortfolio[index], ...updates };
        setPortfolio(newPortfolio);
    };

    const removePortfolioItem = (index: number) => {
        if (confirm('Remove this portfolio item?')) {
            setPortfolio(portfolio.filter((_, i) => i !== index));
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Site Content</h1>
                <p className="text-gray-400">Edit your landing page content. Changes are live immediately.</p>
            </div>

            {/* Hero Section */}
            <Section title="Hero Section" onSave={saveHero} saveStatus={heroStatus}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Headline</label>
                        <input
                            type="text"
                            value={hero.headline}
                            onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">CTA Text</label>
                        <input
                            type="text"
                            value={hero.ctaText}
                            onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Subheadline</label>
                        <textarea
                            value={hero.subheadline}
                            onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                            rows={3}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">CTA Link</label>
                        <input
                            type="text"
                            value={hero.ctaLink}
                            onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                        />
                    </div>
                </div>
            </Section>

            {/* Pricing Section */}
            <Section title="Pricing Tiers" onSave={savePricing} saveStatus={pricingStatus}>
                <div className="space-y-6">
                    {pricing.map((tier, index) => (
                        <div key={tier.id} className="bg-black/20 border border-white/10 rounded-xl p-4 relative">
                            <button
                                onClick={() => removeTier(index)}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={tier.name}
                                        onChange={(e) => updateTier(index, { name: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Price ($/mo)</label>
                                    <input
                                        type="number"
                                        value={tier.price}
                                        onChange={(e) => updateTier(index, { price: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={tier.isPopular || false}
                                            onChange={(e) => updateTier(index, { isPopular: e.target.checked })}
                                            className="rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                                        />
                                        <Star className={`h-4 w-4 ${tier.isPopular ? 'text-brand-gold' : 'text-gray-500'}`} />
                                        <span className="text-sm text-gray-400">Popular</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={tier.description}
                                    onChange={(e) => updateTier(index, { description: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Features (one per line)</label>
                                <textarea
                                    value={tier.features.join('\n')}
                                    onChange={(e) => updateTier(index, { features: e.target.value.split('\n').filter(f => f.trim()) })}
                                    rows={4}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    ))}
                    
                    <button
                        onClick={addTier}
                        className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Pricing Tier
                    </button>
                </div>
            </Section>

            {/* Portfolio Section */}
            <Section title="Portfolio Items" onSave={savePortfolio} saveStatus={portfolioStatus}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolio.map((item, index) => (
                        <div key={item.id} className="bg-black/20 border border-white/10 rounded-xl p-4 relative">
                            <button
                                onClick={() => removePortfolioItem(index)}
                                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-400 transition-colors z-10"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => updatePortfolioItem(index, { title: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={item.category}
                                        onChange={(e) => updatePortfolioItem(index, { category: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        value={item.imageUrl}
                                        onChange={(e) => updatePortfolioItem(index, { imageUrl: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-gold focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button
                        onClick={addPortfolioItem}
                        className="h-48 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                        <Plus className="h-6 w-6" />
                        Add Portfolio Item
                    </button>
                </div>
            </Section>
        </div>
    );
}
