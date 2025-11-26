export interface PricingTier {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    type?: 'image' | 'video'; // Media type
    src?: string; // Legacy field
    imageUrl: string;
    videoUrl?: string; // For reels
    width?: number; // For masonry layout
    height?: number;
}

export interface HeroSection {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
}

export interface Feature {
    title: string;
    description: string;
    icon: string; // Lucide icon name
}

export interface SiteContent {
    hero: HeroSection;
    pricing: PricingTier[];
    features: Feature[];
    portfolio: PortfolioItem[];
}
